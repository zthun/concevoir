import { describe, expect, it } from 'vitest';
import { hex } from './hex';

describe('Hex', () => {
  it('should return the hex value', () => {
    // Arrange.
    const expected = 'rgba(239, 239, 239, 1)';
    // Act.
    const actual = hex(0xefefef);
    // Assert.
    expect(actual).toEqual(expected);
  });
});
