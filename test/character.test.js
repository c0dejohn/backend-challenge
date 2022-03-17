// @ts-nocheck
/* eslint-disable no-undef */
/**
 * @jest-environment node
 */
const request = require('supertest');
const { app, server } = require('../app');

describe('Character Controller', () => {
  // health
  afterAll(() => {
    server.close();
  });
  describe('GET /health', () => {
    jest.setTimeout(10000);
    test('server status', (done) => {
      request(app)
        .get('/api/health')
        .end((err, res) => {
          expect(res.status).toBe(200);
          err ? done(err) : done();
        });
    });
  });
});
