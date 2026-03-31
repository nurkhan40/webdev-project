const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory stores (replace with DB in production)
let schedule = [
  { id: 1, date: '2026-04-01', person: 'Alice' },
  { id: 2, date: '2026-04-02', person: 'Bob' }
];
let reports = [];
let announcements = [];

// API: Duty schedule
app.get('/api/schedule', (req, res) => {
  res.json(schedule);
});
app.post('/api/schedule', (req, res) => {
  const item = { id: schedule.length + 1, ...req.body };
  schedule.push(item);
  res.status(201).json(item);
});

// API: Reports / complaints
app.get('/api/reports', (req, res) => {
  res.json(reports);
});
app.post('/api/reports', (req, res) => {
  const item = { id: reports.length + 1, createdAt: new Date().toISOString(), ...req.body };
  reports.push(item);
  res.status(201).json(item);
});

// API: Announcements
app.get('/api/announcements', (req, res) => {
  res.json(announcements);
});
app.post('/api/announcements', (req, res) => {
  const item = { id: announcements.length + 1, createdAt: new Date().toISOString(), ...req.body };
  announcements.push(item);
  res.status(201).json(item);
});

// Serve static client
app.use('/', express.static(path.join(__dirname, '..', 'client')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CampusSync server running on http://localhost:${PORT}`));
