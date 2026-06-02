# FitTrack-API

<!-- Badge CI a coller a l'exo 10 :
![CI](https://github.com/<votre-org>/fittrack-api/actions/workflows/ci-express.yml/badge.svg)
-->

API Express minimale de suivi des seances d'entrainement, support des exos 10 (CI Express).

## Stack
- Node.js 20 (LTS)
- Express 4
- Jest + Supertest pour les tests

## Installation
```bash
npm install        # genere package-lock.json (a committer pour npm ci)
```

## Lancer en local
```bash
npm start          # http://localhost:3000
npm run dev        # avec rechargement (node --watch)
```

## Tester
```bash
npm test                 # suite Jest + Supertest
npm run test:coverage    # avec rapport de couverture
```

## Routes
| Methode | Chemin            | Description                          |
|---------|-------------------|--------------------------------------|
| GET     | `/health`         | Etat de l'API (`{ status: 'ok' }`)   |
| GET     | `/workouts`       | Liste des seances (filtre `?type=`)  |
| GET     | `/workouts/:id`   | Une seance (404 si absente)          |
| POST    | `/workouts`       | Cree une seance (400 si `type` manque) |

## Structure
```
src/
  app.js                 # montage Express (exporte pour Supertest)
  routes/workouts.js     # CRUD minimal des seances
  data/seed.js           # donnees de demarrage
  data/store.js          # store memoire + reset() pour l'isolation des tests
  middleware/errorHandler.js
server.js                # point d'entree (app.listen)
tests/workouts.test.js   # 5 tests Jest + Supertest
```
