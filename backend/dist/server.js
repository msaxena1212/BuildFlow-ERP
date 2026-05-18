"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mock_data_1 = require("./data/mock-data");
const settlement_service_1 = require("./services/settlement.service");
const poc_service_1 = require("./services/poc.service");
const inventory_service_1 = require("./services/inventory.service");
const leads_service_1 = require("./services/leads.service");
const invoicing_service_1 = require("./services/invoicing.service");
const branch_service_1 = require("./services/branch.service");
const app = (0, express_1.default)();
const port = process.env.PORT || 4173;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- CORE DATA ROUTES ---
app.get('/api/projects', (req, res) => res.json(mock_data_1.projects));
app.get('/api/projects/:id', (req, res) => {
    const project = mock_data_1.projects.find((p) => p.id === req.params.id);
    if (project)
        res.json(project);
    else
        res.status(404).send('Project not found');
});
app.get('/api/materials', (req, res) => res.json(mock_data_1.materials));
app.get('/api/team', (req, res) => res.json(mock_data_1.teamMembers));
app.get('/api/templates', (req, res) => res.json(mock_data_1.projectTemplates));
app.get('/api/vendors', (req, res) => res.json(mock_data_1.vendors));
app.get('/api/roles', (req, res) => res.json(mock_data_1.roles));
// --- ENTERPRISE: LEADS & SALES ---
app.get('/api/leads', (req, res) => res.json(leads_service_1.LeadsService.getAllLeads()));
app.post('/api/leads', (req, res) => res.status(201).json(leads_service_1.LeadsService.createLead(req.body)));
app.post('/api/leads/:id/convert', (req, res) => {
    const { customerName, contractId, type } = req.body;
    const sale = leads_service_1.LeadsService.convertToSale(req.params.id, customerName, contractId, type);
    if (sale)
        res.json(sale);
    else
        res.status(400).send('Conversion failed');
});
app.get('/api/sales', (req, res) => res.json(leads_service_1.LeadsService.getAllSales()));
app.post('/api/sales/:id/approve', (req, res) => {
    const sale = leads_service_1.LeadsService.approveSale(req.params.id);
    if (sale)
        res.json(sale);
    else
        res.status(404).send('Sale not found');
});
app.get('/api/tenders', (req, res) => res.json(leads_service_1.LeadsService.getAllTenders()));
app.post('/api/tenders', (req, res) => res.status(201).json(leads_service_1.LeadsService.submitTender(req.body)));
// --- ENTERPRISE: INVOICING & FINANCIALS ---
app.get('/api/purchase-orders', (req, res) => res.json(mock_data_1.purchaseOrders));
app.get('/api/invoices', (req, res) => res.json(mock_data_1.invoices));
app.post('/api/invoices/generate', (req, res) => {
    const { projectCode, milestoneId, amount } = req.body;
    res.json(invoicing_service_1.InvoicingService.generateMilestoneInvoice(projectCode, milestoneId, amount));
});
app.post('/api/invoices/:id/approve', (req, res) => {
    try {
        const { approverId, wccValidated, poId } = req.body;
        res.json(invoicing_service_1.InvoicingService.approveInvoice(req.params.id, approverId, wccValidated, poId));
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
app.post('/api/notes', (req, res) => {
    const { invoiceId, type, amount, reason } = req.body;
    res.json(invoicing_service_1.InvoicingService.createCreditDebitNote(invoiceId, type, amount, reason));
});
app.post('/api/invoices/:id/nfa', (req, res) => {
    const { amountToRemove, justification } = req.body;
    res.json(invoicing_service_1.InvoicingService.processNFARemoval(req.params.id, amountToRemove, justification));
});
app.get('/api/collections', (req, res) => {
    invoicing_service_1.InvoicingService.runAgingUpdate();
    res.json(mock_data_1.collectionTrackings);
});
// --- ENTERPRISE: BRANCHES & SETTLEMENTS ---
app.get('/api/branches', (req, res) => res.json(branch_service_1.BranchService.getAllBranches()));
app.get('/api/settlements', (req, res) => res.json(mock_data_1.branchSettlements));
app.post('/api/vendors/:id/settlements/generate', (req, res) => {
    console.log(`[POST] /api/vendors/${req.params.id}/settlements/generate`, req.body);
    try {
        const { projectId, basis } = req.body;
        // @ts-ignore
        const result = settlement_service_1.SettlementService.generateSuggestedSettlement(req.params.id, projectId, basis);
        res.json(result);
    }
    catch (e) {
        console.error('[Settlement Generation Error]', e.message);
        res.status(400).send(e.message);
    }
});
app.post('/api/vendors/:id/settlements', (req, res) => {
    console.log(`[POST] /api/vendors/${req.params.id}/settlements`, req.body);
    const request = req.body;
    if (request.status === 'Draft' || !request.status) {
        request.status = 'Pending';
        res.json(settlement_service_1.SettlementService.saveSettlementRequest(request));
    }
    else {
        // This handles Approve/Reject (updating status)
        // @ts-ignore
        const updated = settlement_service_1.SettlementService.updateSettlementRequest(req.params.id, request);
        if (updated)
            res.json(updated);
        else
            res.status(404).send('Request not found');
    }
});
app.post('/api/settlements/initiate', (req, res) => {
    try {
        const { fromBranchId, toBranchId, amount, referenceType } = req.body;
        res.status(201).json(branch_service_1.BranchService.initiateSettlement(fromBranchId, toBranchId, amount, referenceType));
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
app.post('/api/settlements/:id/complete', (req, res) => {
    const settlement = branch_service_1.BranchService.completeSettlement(req.params.id);
    if (settlement)
        res.json(settlement);
    else
        res.status(404).send('Settlement not found or already completed');
});
// --- OPERATIONAL MODULES ---
app.get('/api/updates', (req, res) => res.json(mock_data_1.updates));
app.get('/api/tasks', (req, res) => res.json(mock_data_1.tasks));
app.get('/api/quotes', (req, res) => res.json(mock_data_1.quotes));
app.get('/api/contracts', (req, res) => res.json(mock_data_1.contracts));
app.get('/api/contract-history', (req, res) => res.json(mock_data_1.contractHistory));
app.get('/api/labor-stats', (req, res) => res.json(mock_data_1.laborStats));
app.get('/api/alerts', (req, res) => res.json(mock_data_1.emailAlerts));
app.get('/api/reports', (req, res) => res.json(mock_data_1.reportVault));
app.get('/api/purchase-requisitions', (req, res) => res.json(mock_data_1.purchaseRequisitions));
app.get('/api/stock-transfers', (req, res) => res.json(mock_data_1.stockTransfers));
app.get('/api/material-returns', (req, res) => res.json(mock_data_1.materialReturns));
app.get('/api/guarantee-tracking', (req, res) => res.json(mock_data_1.guaranteeTracking));
app.get('/api/billing-documents', (req, res) => res.json(mock_data_1.billingDocuments));
app.get('/api/branch-settlements', (req, res) => res.json(mock_data_1.branchSettlements));
app.get('/api/contractor-metrics', (req, res) => res.json(mock_data_1.contractorMetrics));
app.post('/api/projects/:id/poc/consolidate', (req, res) => {
    const updatedProject = poc_service_1.PocService.runConsolidation(req.params.id);
    if (updatedProject)
        res.json(updatedProject);
    else
        res.status(404).send('Project not found');
});
// --- INVENTORY ---
app.get('/api/inventory/requests', (req, res) => res.json(inventory_service_1.InventoryService.getRequests()));
app.get('/api/inventory/returns', (req, res) => res.json(inventory_service_1.InventoryService.getReturns()));
app.post('/api/inventory/requests', (req, res) => res.status(201).json(inventory_service_1.InventoryService.createRequest(req.body)));
// SERVER START
app.listen(port, () => {
    console.log(`BuildFlow Backend listening at http://localhost:${port}`);
});
