/**
 * @jest-environment node
 */
const request = require('supertest');
const app = require('../../app').server;

describe('Character', () => {
  afterAll(() => {
    app.close();
  });
  describe('GET /characters', () => {
    test('check findAll method', (done) => {
      request(app)
        .get('/api/my-disney/characters')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).toBe(401);
          err ? done(err) : done();
        });
    });
  });
});
