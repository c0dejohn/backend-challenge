// const assert = require('mocha');
/**
 * @jest-environment node
 */
const request = require('supertest');
const app = require('../../app').server;
// const { data, post_data } = require('./mock/character.mock');
// const characterController = require('../controller/character');

/*
describe('Character Controller test', () => {
  it('check get all method', () => {
    const result = characterController.findAll();
    assert.equal(result, undefined);
  });
  it('check create method', () => {
    const result = characterController.create(post_data);
    assert.equal(result, post_data);
  });
});*/

describe('Character', () => {
  afterAll(() => {
    app.close();
  });
  describe('GET /characters', () => {
    test('check findAll method', (done) => {
      request(app)
        .get('/api/my-disney/characters')
        .set('Accept', 'application/json')
        .set('headers', 'x-api-key:1234')
        .end((err, res) => {
          expect(res.status).toBe(200);
          err ? done(err) : done();
        });
    });
  });
});
