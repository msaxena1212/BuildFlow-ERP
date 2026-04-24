import express, { Request, Response } from 'express';
import cors from 'cors';
import { projects, updates, materials, tasks, vendors, quotes, contracts, contractHistory, roles, teamMembers, contractorMetrics, laborStats, reportVault } from './data/mock-data';
import { Role, TeamMember } from './models/models';

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



app.get('/health', (req: Request, res: Response) => {
  res.send('BuildFlow API is running');
});


app.listen(port, () => {
  console.log(`BuildFlow Backend listening at http://localhost:${port}`);
});
