'use strict';

const request = require('supertest');
const app = require('../src/app');
const { reset } = require('../src/data/store');

beforeEach(() => {
  reset();
});

describe('FitTrack API - workouts', () => {
  test('GET /health -> 200 status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /workouts -> 200, data est un tableau contenant wk-0001', async () => {
    const res = await request(app).get('/workouts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    const ids = res.body.data.map((w) => w.id);
    expect(ids).toContain('wk-0001');
  });

  test('GET /workouts/wk-9999 -> 404', async () => {
    const res = await request(app).get('/workouts/wk-9999');
    expect(res.status).toBe(404);
  });

  test('POST /workouts valide -> 201 avec un id', async () => {
    const res = await request(app)
      .post('/workouts')
      .send({ type: 'natation', durationMin: 40, calories: 300 });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.type).toBe('natation');
  });

  test('POST /workouts sans type -> 400', async () => {
    const res = await request(app).post('/workouts').send({ durationMin: 20 });
    expect(res.status).toBe(400);
  });
});
