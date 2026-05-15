"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mock_data_1 = require("./data/mock-data");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Projects
app.get('/api/projects', (req, res) => {
    res.json(mock_data_1.projects);
});
app.get('/api/projects/:id', (req, res) => {
    const project = mock_data_1.projects.find(p => p.id === req.params.id);
    if (project) {
        res.json(project);
    }
    else {
        res.status(404).send('Project not found');
    }
});
const poc_service_1 = require("./services/poc.service");
app.post('/api/projects/:id/poc/consolidate', (req, res) => {
    const updatedProject = poc_service_1.PocService.runConsolidation(req.params.id);
    if (updatedProject) {
        res.json(updatedProject);
    }
    else {
        res.status(404).send('Project or POC details not found');
    }
});
// Updates
app.get('/api/updates', (req, res) => {
    res.json(mock_data_1.updates);
});
// Materials
app.get('/api/materials', (req, res) => {
    res.json(mock_data_1.materials);
});
// Tasks
app.get('/api/tasks', (req, res) => {
    res.json(mock_data_1.tasks);
});
// Vendors
app.get('/api/vendors', (req, res) => {
    res.json(mock_data_1.vendors);
});
// Quotes
app.get('/api/quotes', (req, res) => {
    res.json(mock_data_1.quotes);
});
app.post('/api/quotes', (req, res) => {
    const newQuote = req.body;
    mock_data_1.quotes.push(newQuote);
    res.status(201).json(newQuote);
});
app.patch('/api/quotes/:id', (req, res) => {
    const index = mock_data_1.quotes.findIndex(q => q.id === req.params.id);
    if (index !== -1) {
        mock_data_1.quotes[index] = Object.assign(Object.assign({}, mock_data_1.quotes[index]), req.body);
        res.json(mock_data_1.quotes[index]);
    }
    else {
        res.status(404).send('Quote not found');
    }
});
app.delete('/api/quotes/:id', (req, res) => {
    const index = mock_data_1.quotes.findIndex(q => q.id === req.params.id);
    if (index !== -1) {
        mock_data_1.quotes.splice(index, 1);
        res.sendStatus(204);
    }
    else {
        res.status(404).send('Quote not found');
    }
});
// Contracts
app.get('/api/contracts', (req, res) => {
    res.json(mock_data_1.contracts);
});
app.post('/api/contracts', (req, res) => {
    const newContract = req.body;
    mock_data_1.contracts.push(newContract);
    res.status(201).json(newContract);
});
app.patch('/api/contracts/:id', (req, res) => {
    const index = mock_data_1.contracts.findIndex(c => c.id === req.params.id);
    if (index !== -1) {
        mock_data_1.contracts[index] = Object.assign(Object.assign({}, mock_data_1.contracts[index]), req.body);
        res.json(mock_data_1.contracts[index]);
    }
    else {
        res.status(404).send('Contract not found');
    }
});
// Contract History
app.get('/api/contract-history', (req, res) => {
    res.json(mock_data_1.contractHistory);
});
app.post('/api/contract-history', (req, res) => {
    const newEvent = req.body;
    mock_data_1.contractHistory.unshift(newEvent); // Add to top
    res.status(201).json(newEvent);
});
// Roles
app.get('/api/roles', (req, res) => {
    res.json(mock_data_1.roles);
});
app.post('/api/roles', (req, res) => {
    const newRole = Object.assign(Object.assign({}, req.body), { id: 'r' + Date.now() });
    mock_data_1.roles.push(newRole);
    res.status(201).json(newRole);
});
app.patch('/api/roles/:id', (req, res) => {
    const idx = mock_data_1.roles.findIndex(r => r.id === req.params.id);
    if (idx !== -1) {
        mock_data_1.roles[idx] = Object.assign(Object.assign({}, mock_data_1.roles[idx]), req.body);
        res.json(mock_data_1.roles[idx]);
    }
    else {
        res.status(404).send('Role not found');
    }
});
app.delete('/api/roles/:id', (req, res) => {
    const idx = mock_data_1.roles.findIndex(r => r.id === req.params.id);
    if (idx !== -1) {
        if (mock_data_1.roles[idx].isSystem) {
            return res.status(403).send('Cannot delete system roles');
        }
        mock_data_1.roles.splice(idx, 1);
        res.sendStatus(204);
    }
    else {
        res.status(404).send('Role not found');
    }
});
// Team Members
app.get('/api/team', (req, res) => {
    res.json(mock_data_1.teamMembers);
});
app.post('/api/team', (req, res) => {
    const newMember = Object.assign(Object.assign({}, req.body), { id: 'm' + Date.now() });
    mock_data_1.teamMembers.push(newMember);
    res.status(201).json(newMember);
});
app.patch('/api/team/:id', (req, res) => {
    const idx = mock_data_1.teamMembers.findIndex(m => m.id === req.params.id);
    if (idx !== -1) {
        mock_data_1.teamMembers[idx] = Object.assign(Object.assign({}, mock_data_1.teamMembers[idx]), req.body);
        res.json(mock_data_1.teamMembers[idx]);
    }
    else {
        res.status(404).send('Member not found');
    }
});
app.delete('/api/team/:id', (req, res) => {
    const idx = mock_data_1.teamMembers.findIndex(m => m.id === req.params.id);
    if (idx !== -1) {
        mock_data_1.teamMembers.splice(idx, 1);
        res.sendStatus(204);
    }
    else {
        res.status(404).send('Member not found');
    }
});
// Contractor Metrics
app.get('/api/contractor-metrics', (req, res) => {
    res.json(mock_data_1.contractorMetrics);
});
// Labor Stats
app.get('/api/labor-stats', (req, res) => {
    res.json(mock_data_1.laborStats);
});
// Reports
app.get('/api/reports', (req, res) => {
    res.json(mock_data_1.reportVault);
});
app.get('/health', (req, res) => {
    res.send('BuildFlow API is running');
});
app.listen(port, () => {
    console.log(`BuildFlow Backend listening at http://localhost:${port}`);
});
