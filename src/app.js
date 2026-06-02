'use strict';

const express = require('express');
const cors = require('cors');

const workoutsRouter = require('./routes/workouts');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Health check (monte directement, hors router).
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/workouts', workoutsRouter);

// 404 puis gestionnaire d'erreurs (toujours en dernier).
app.use(notFound);
app.use(errorHandler);

module.exports = app;
