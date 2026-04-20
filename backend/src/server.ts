import express, { Request, Response } from 'express';
import cors from 'cors';
import { projects, updates, materials, tasks, vendors, quotes } from './data/mock-data';

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());

// Routes
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

app.get('/api/updates', (req: Request, res: Response) => {
  res.json(updates);
});

app.get('/api/materials', (req: Request, res: Response) => {
  res.json(materials);
});

app.get('/api/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

app.get('/api/vendors', (req: Request, res: Response) => {
  res.json(vendors);
});

app.get('/api/quotes', (req: Request, res: Response) => {
  res.json(quotes);
});

app.post('/api/quotes', (req: Request, res: Response) => {
  const newQuote = req.body;
  quotes.push(newQuote);
  res.status(201).json(newQuote);
});

app.get('/health', (req: Request, res: Response) => {
  res.send('ZYNO API is running');
});

app.listen(port, () => {
  console.log(`ZYNO Backend listening at http://localhost:${port}`);
});
