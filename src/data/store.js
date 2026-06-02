'use strict';

const seed = require('./seed');

// Copie profonde portable (Node 18+ a structuredClone, fallback JSON).
function deepClone(value) {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

// Store en memoire. Jamais de reference directe vers le seed.
const store = {
  workouts: [],
};

// Re-initialise le store a partir d'une copie profonde du seed.
// Appele en beforeEach dans les tests pour garantir l'isolation.
function reset() {
  store.workouts = deepClone(seed.workouts);
  return store;
}

// Initialisation au chargement du module.
reset();

module.exports = { store, reset, deepClone };
