import express, { Request, Response } from 'express';
import cors from 'cors';
import { SettlementService } from './services/settlement.service';
import { projects, updates, materials, tasks, vendors, quotes, contracts, contractHistory, roles, teamMembers, contractorMetrics, laborStats, reportVault, purchaseRequisitions, stockTransfers } from './data/mock-data';
import { Role, TeamMember } from './models/models';
import { PocService } from './services/poc.service';
import { ComplianceService } from './services/compliance.service';
import { MaterialIntelligenceService } from './services/material.service';
import { TemplateService } from './services/template.service';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Projects
app.get('/api/projects', (req: Request, res: Response) => {
  res.json(projects);
});

app.get('/api/projects/:id', (req: Request, res: Response) => {
  const project = projects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).send('Project not found');
  }
});

app.post('/api/projects/:id/poc/consolidate', (req: Request, res: Response) => {
  const updatedProject = PocService.runConsolidation(req.params.id as string);
  if (updatedProject) {
    res.json(updatedProject);
  } else {
    res.status(404).send('Project or POC details not found');
  }
});

// Updates
app.get('/api/updates', (req: Request, res: Response) => {
  res.json(updates);
});

// Materials
app.get('/api/materials', (req: Request, res: Response) => {
  res.json(materials);
});

// Tasks
app.get('/api/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// Vendors
app.get('/api/vendors', (req: Request, res: Response) => {
  res.json(vendors);
});

// Quotes
app.get('/api/quotes', (req: Request, res: Response) => {
  res.json(quotes);
});

app.post('/api/quotes', (req: Request, res: Response) => {
  const newQuote = req.body;
  quotes.push(newQuote);
  res.status(201).json(newQuote);
});

app.patch('/api/quotes/:id', (req: Request, res: Response) => {
  const index = quotes.findIndex(q => q.id === req.params.id);
  if (index !== -1) {
    quotes[index] = { ...quotes[index], ...req.body };
    res.json(quotes[index]);
  } else {
    res.status(404).send('Quote not found');
  }
});

app.delete('/api/quotes/:id', (req: Request, res: Response) => {
  const index = quotes.findIndex(q => q.id === req.params.id);
  if (index !== -1) {
    quotes.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send('Quote not found');
  }
});

// Contracts
app.get('/api/contracts', (req: Request, res: Response) => {
  res.json(contracts);
});

app.post('/api/contracts', (req: Request, res: Response) => {
  const newContract = req.body;
  contracts.push(newContract);
  res.status(201).json(newContract);
});

app.patch('/api/contracts/:id', (req: Request, res: Response) => {
  const index = contracts.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    contracts[index] = { ...contracts[index], ...req.body };
    res.json(contracts[index]);
  } else {
    res.status(404).send('Contract not found');
  }
});

// Contract History
app.get('/api/contract-history', (req: Request, res: Response) => {
  res.json(contractHistory);
});

app.post('/api/contract-history', (req: Request, res: Response) => {
  const newEvent = req.body;
  contractHistory.unshift(newEvent); // Add to top
  res.status(201).json(newEvent);
});

// Roles
app.get('/api/roles', (req: Request, res: Response) => {
  res.json(roles);
});

app.post('/api/roles', (req: Request, res: Response) => {
  const newRole: Role = { ...req.body, id: 'r' + Date.now() };
  roles.push(newRole);
  res.status(201).json(newRole);
});

app.patch('/api/roles/:id', (req: Request, res: Response) => {
  const idx = roles.findIndex(r => r.id === req.params.id);
  if (idx !== -1) {
    roles[idx] = { ...roles[idx], ...req.body };
    res.json(roles[idx]);
  } else {
    res.status(404).send('Role not found');
  }
});

app.delete('/api/roles/:id', (req: Request, res: Response) => {
  const idx = roles.findIndex(r => r.id === req.params.id);
  if (idx !== -1) {
    if (roles[idx].isSystem) {
      return res.status(403).send('Cannot delete system roles');
    }
    roles.splice(idx, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send('Role not found');
  }
});

// Team Members
app.get('/api/team', (req: Request, res: Response) => {
  res.json(teamMembers);
});

app.post('/api/team', (req: Request, res: Response) => {
  const newMember: TeamMember = { ...req.body, id: 'm' + Date.now() };
  teamMembers.push(newMember);
  res.status(201).json(newMember);
});

app.patch('/api/team/:id', (req: Request, res: Response) => {
  const idx = teamMembers.findIndex(m => m.id === req.params.id);
  if (idx !== -1) {
    teamMembers[idx] = { ...teamMembers[idx], ...req.body };
    res.json(teamMembers[idx]);
  } else {
    res.status(404).send('Member not found');
  }
});

app.delete('/api/team/:id', (req: Request, res: Response) => {
  const idx = teamMembers.findIndex(m => m.id === req.params.id);
  if (idx !== -1) {
    teamMembers.splice(idx, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send('Member not found');
  }
});

// Contractor Metrics
app.get('/api/contractor-metrics', (req: Request, res: Response) => {
  res.json(contractorMetrics);
});

// Labor Stats
app.get('/api/labor-stats', (req: Request, res: Response) => {
  res.json(laborStats);
});

// Reports
app.get('/api/reports', (req: Request, res: Response) => {
  res.json(reportVault);
});

// Purchase Requisitions
app.get('/api/purchase-requisitions', (req: Request, res: Response) => {
  res.json(purchaseRequisitions);
});

app.post('/api/purchase-requisitions', (req: Request, res: Response) => {
  const newPR = { ...req.body, id: 'PR-' + Date.now() };
  purchaseRequisitions.unshift(newPR);
  res.status(201).json(newPR);
});

// Stock Transfers
app.get('/api/stock-transfers', (req: Request, res: Response) => {
  res.json(stockTransfers);
});

app.post('/api/stock-transfers', (req: Request, res: Response) => {
  const newTransfer = { ...req.body, id: 'TR-' + Date.now() };
  stockTransfers.unshift(newTransfer);
  res.status(201).json(newTransfer);
});

// Settlement Endpoints
app.post('/api/vendors/:vendorId/settlements/generate', (req: Request, res: Response) => {
  try {
    const { vendorId } = req.params;
    const { projectId, basis } = req.body;
    const request = SettlementService.generateSuggestedSettlement(vendorId as string, projectId, basis);
    res.json(request);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/vendors/:vendorId/settlements', (req: Request, res: Response) => {
  try {
    const request = SettlementService.saveSettlementRequest(req.body);
    res.status(201).json(request);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Compliance Endpoints
app.get('/api/projects/:id/compliance/health', (req: Request, res: Response) => {
  const health = ComplianceService.getComplianceHealth(req.params.id);
  res.json(health);
});

app.post('/api/projects/:id/compliance/submit', (req: Request, res: Response) => {
  const { type } = req.body;
  const submission = ComplianceService.submitToRegulatory(req.params.id, type);
  res.json(submission);
});

// Material Intelligence Endpoints
app.get('/api/materials/analysis', (req: Request, res: Response) => {
  const analysis = MaterialIntelligenceService.analyzeInventory();
  res.json(analysis);
});

app.post('/api/materials/auto-reorder', (req: Request, res: Response) => {
  const newPRs = MaterialIntelligenceService.triggerAutoReorder();
  res.json(newPRs);
});

app.listen(port, () => {
  console.log(`BuildFlow Backend listening at http://localhost:${port}`);
});
