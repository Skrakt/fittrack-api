'use strict';

// Donnees de demarrage. Jamais mutees directement : le store en fait une copie.
const workouts = [
  {
    id: 'wk-0001',
    type: 'course',
    durationMin: 45,
    calories: 420,
    date: '2026-05-12',
  },
  {
    id: 'wk-0002',
    type: 'musculation',
    durationMin: 60,
    calories: 350,
    date: '2026-05-14',
  },
  {
    id: 'wk-0003',
    type: 'yoga',
    durationMin: 30,
    calories: 110,
    date: '2026-05-15',
  },
];

module.exports = { workouts };
