import express, { Request, Response } from 'express';
import cors from 'cors';
import { projects, updates, materials, tasks, vendors, quotes, contracts, contractHistory } from './data/mock-data';

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

app.get('/health', (req: Request, res: Response) => {
  res.send('ZYNO API is running');
});


app.listen(port, () => {
  console.log(`ZYNO Backend listening at http://localhost:${port}`);
});
