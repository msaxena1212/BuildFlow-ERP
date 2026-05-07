import express, { Request, Response } from 'express';
import cors from 'cors';
import { 
  projects, updates, materials, tasks, vendors, quotes, contracts, contractHistory, 
  roles, teamMembers, contractorMetrics, laborStats, reportVault, purchaseRequisitions, 
  stockTransfers, projectTemplates, materialReturns, inventoryRequests, inventoryReturns, 
  branches, expenses, guaranteeTracking, billingDocuments, branchSettlements, leads, 
  sales, tenders, purchaseOrders, invoices, invoiceApprovals, creditDebitNotes, 
  collectionTrackings, emailAlerts, milestoneBillings 
} from './data/mock-data';
import { Role, TeamMember, Lead, Sale, Tender, PurchaseOrder, Invoice, InvoiceApproval, CreditDebitNote, EmailAlert } from './models/models';

import { SettlementService } from './services/settlement.service';
import { PocService } from './services/poc.service';
import { ComplianceService } from './services/compliance.service';
import { MaterialIntelligenceService } from './services/material.service';
import { InventoryService } from './services/inventory.service';
import { LeadsService } from './services/leads.service';
import { InvoicingService } from './services/invoicing.service';
import { BranchService } from './services/branch.service';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// --- CORE DATA ROUTES ---

app.get('/api/projects', (req: Request, res: Response) => res.json(projects));
app.get('/api/projects/:id', (req: Request, res: Response) => {
  const project = projects.find((p: any) => p.id === req.params.id);
  if (project) res.json(project);
  else res.status(404).send('Project not found');
});

app.get('/api/materials', (req: Request, res: Response) => res.json(materials));
app.get('/api/team', (req: Request, res: Response) => res.json(teamMembers));
app.get('/api/templates', (req: Request, res: Response) => res.json(projectTemplates));
app.get('/api/vendors', (req: Request, res: Response) => res.json(vendors));
app.get('/api/roles', (req: Request, res: Response) => res.json(roles));

// --- ENTERPRISE: LEADS & SALES ---

app.get('/api/leads', (req: Request, res: Response) => res.json(LeadsService.getAllLeads()));
app.post('/api/leads', (req: Request, res: Response) => res.status(201).json(LeadsService.createLead(req.body)));
app.post('/api/leads/:id/convert', (req: Request, res: Response) => {
  const { customerName, contractId, type } = req.body;
  const sale = LeadsService.convertToSale(req.params.id as string, customerName, contractId, type);
  if (sale) res.json(sale);
  else res.status(400).send('Conversion failed');
});

app.get('/api/sales', (req: Request, res: Response) => res.json(LeadsService.getAllSales()));
app.post('/api/sales/:id/approve', (req: Request, res: Response) => {
  const sale = LeadsService.approveSale(req.params.id as string);
  if (sale) res.json(sale);
  else res.status(404).send('Sale not found');
});

app.get('/api/tenders', (req: Request, res: Response) => res.json(LeadsService.getAllTenders()));
app.post('/api/tenders', (req: Request, res: Response) => res.status(201).json(LeadsService.submitTender(req.body)));

// --- ENTERPRISE: INVOICING & FINANCIALS ---

app.get('/api/purchase-orders', (req: Request, res: Response) => res.json(purchaseOrders));
app.get('/api/invoices', (req: Request, res: Response) => res.json(invoices));
app.post('/api/invoices/generate', (req: Request, res: Response) => {
  const { projectCode, milestoneId, amount } = req.body;
  res.json(InvoicingService.generateMilestoneInvoice(projectCode, milestoneId, amount));
});

app.post('/api/invoices/:id/approve', (req: Request, res: Response) => {
  try {
    const { approverId, wccValidated, poId } = req.body;
    res.json(InvoicingService.approveInvoice(req.params.id as string, approverId, wccValidated, poId));
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

app.post('/api/notes', (req: Request, res: Response) => {
  const { invoiceId, type, amount, reason } = req.body;
  res.json(InvoicingService.createCreditDebitNote(invoiceId, type, amount, reason));
});

app.post('/api/invoices/:id/nfa', (req: Request, res: Response) => {
  const { amountToRemove, justification } = req.body;
  res.json(InvoicingService.processNFARemoval(req.params.id as string, amountToRemove, justification));
});

app.get('/api/collections', (req: Request, res: Response) => {
  InvoicingService.runAgingUpdate();
  res.json(collectionTrackings);
});

// --- ENTERPRISE: BRANCHES & SETTLEMENTS ---

app.get('/api/branches', (req: Request, res: Response) => res.json(BranchService.getAllBranches()));
app.get('/api/settlements', (req: Request, res: Response) => res.json(branchSettlements));

app.post('/api/vendors/:id/settlements/generate', (req: Request, res: Response) => {
  console.log(`[POST] /api/vendors/${req.params.id}/settlements/generate`, req.body);
  try {
    const { projectId, basis } = req.body;
    // @ts-ignore
    const result = SettlementService.generateSuggestedSettlement(req.params.id, projectId, basis);
    res.json(result);
  } catch (e: any) {
    console.error('[Settlement Generation Error]', e.message);
    res.status(400).send(e.message);
  }
});

app.post('/api/vendors/:id/settlements', (req: Request, res: Response) => {
  console.log(`[POST] /api/vendors/${req.params.id}/settlements`, req.body);
  const request = req.body;
  if (request.status === 'Draft' || !request.status) {
    request.status = 'Pending';
    res.json(SettlementService.saveSettlementRequest(request));
  } else {
    // This handles Approve/Reject (updating status)
    // @ts-ignore
    const updated = SettlementService.updateSettlementRequest(req.params.id, request);
    if (updated) res.json(updated);
    else res.status(404).send('Request not found');
  }
});

app.post('/api/settlements/initiate', (req: Request, res: Response) => {
  try {
    const { fromBranchId, toBranchId, amount, referenceType } = req.body;
    res.status(201).json(BranchService.initiateSettlement(fromBranchId, toBranchId, amount, referenceType));
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

app.post('/api/settlements/:id/complete', (req: Request, res: Response) => {
  const settlement = BranchService.completeSettlement(req.params.id as string);
  if (settlement) res.json(settlement);
  else res.status(404).send('Settlement not found or already completed');
});

// --- OPERATIONAL MODULES ---

app.get('/api/updates', (req: Request, res: Response) => res.json(updates));
app.get('/api/tasks', (req: Request, res: Response) => res.json(tasks));
app.get('/api/quotes', (req: Request, res: Response) => res.json(quotes));
app.get('/api/contracts', (req: Request, res: Response) => res.json(contracts));
app.get('/api/contract-history', (req: Request, res: Response) => res.json(contractHistory));
app.get('/api/labor-stats', (req: Request, res: Response) => res.json(laborStats));
app.get('/api/alerts', (req: Request, res: Response) => res.json(emailAlerts));
app.get('/api/reports', (req: Request, res: Response) => res.json(reportVault));
app.get('/api/purchase-requisitions', (req: Request, res: Response) => res.json(purchaseRequisitions));
app.get('/api/stock-transfers', (req: Request, res: Response) => res.json(stockTransfers));
app.get('/api/material-returns', (req: Request, res: Response) => res.json(materialReturns));
app.get('/api/guarantee-tracking', (req: Request, res: Response) => res.json(guaranteeTracking));
app.get('/api/billing-documents', (req: Request, res: Response) => res.json(billingDocuments));
app.get('/api/branch-settlements', (req: Request, res: Response) => res.json(branchSettlements));
app.get('/api/contractor-metrics', (req: Request, res: Response) => res.json(contractorMetrics));

app.post('/api/projects/:id/poc/consolidate', (req: Request, res: Response) => {
  const updatedProject = PocService.runConsolidation(req.params.id as string);
  if (updatedProject) res.json(updatedProject);
  else res.status(404).send('Project not found');
});

// --- INVENTORY ---

app.get('/api/inventory/requests', (req: Request, res: Response) => res.json(InventoryService.getRequests()));
app.get('/api/inventory/returns', (req: Request, res: Response) => res.json(InventoryService.getReturns()));
app.post('/api/inventory/requests', (req: Request, res: Response) => res.status(201).json(InventoryService.createRequest(req.body)));

// SERVER START
app.listen(port, () => {
  console.log(`BuildFlow Backend listening at http://localhost:${port}`);
});
