import { first, second } from '../lib/api/main.js';

describe('first', () => {
  it('should be a function', () => {
    expect(typeof first).toBe('function');
  });
});

describe('second', () => {
  it('should be a function', () => {
    expect(typeof second).toBe('function');
  });
});
