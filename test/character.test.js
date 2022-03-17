// @ts-nocheck
/* eslint-disable no-undef */
/**
 * @jest-environment node
 */
const { expect } = require('chai');
const { sum } = require('../src/controller/character');
describe('Character Controller', () => {
  // health

  test('server status', () => {
    expect(sum(1, 2)).to.be.equal(3);
  });
});
