// @ts-nocheck
/* eslint-disable no-undef */
/**
 * @jest-environment node
 */

const { sum } = require('../src/controller/character');
describe('Character Controller', () => {
  // health

  test('server status', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});
