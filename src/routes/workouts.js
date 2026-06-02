'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { store } = require('../data/store');

const router = express.Router();

// GET / -> liste des seances, filtre optionnel par type (?type=).
router.get('/', (req, res) => {
  const type = (req.query.type || '').toLowerCase();
  let items = store.workouts;
  if (type) {
    items = items.filter((w) => w.type.toLowerCase() === type);
  }
  res.json({ data: items, total: items.length });
});

// GET /:id -> une seance (404 si absente).
router.get('/:id', (req, res) => {
  const workout = store.workouts.find((w) => w.id === req.params.id);
  if (!workout) {
    return res.status(404).json({ error: 'workout not found' });
  }
  res.json(workout);
});

// POST / -> cree une seance (id genere). 400 si le type manque.
router.post('/', (req, res) => {
  const body = req.body || {};
  if (!body.type) {
    return res.status(400).json({ error: 'type is required' });
  }
  const workout = {
    id: uuidv4(),
    type: body.type,
    durationMin: body.durationMin != null ? body.durationMin : 0,
    calories: body.calories != null ? body.calories : 0,
    date: body.date || new Date().toISOString().slice(0, 10),
  };
  store.workouts.push(workout);
  res.status(201).json(workout);
});

module.exports = router;
