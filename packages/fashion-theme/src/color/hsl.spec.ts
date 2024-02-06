import { describe, expect, it } from 'vitest';
import { hsl } from './hsl.mjs';

describe('HSL', () => {
  function shouldReturnHsl(expected: string, h: number, s: number, l: number, a?: number) {
    // Arrange.
    // Act.
    const actual = hsl(h, s, l, a);
    // Assert.
    expect(actual).toEqual(expected);
  }

  it('should return the hsl value', () => {
    shouldReturnHsl('hsla(120, 66%, 99%, 0.25)', 120, 66, 99, 0.25);
  });

  it('should keep the decimals for hsl', () => {
    shouldReturnHsl('hsla(320.99, 66.22%, 71.111%, 0.25)', 320.99, 66.22, 71.111, 0.25);
  });

  it('should use 0 if s,l values are less than 0', () => {
    shouldReturnHsl('hsla(-25, 0%, 0%, 1)', -25, -1, -1);
  });

  it('should use 100 if s,l values are greater than 100', () => {
    shouldReturnHsl('hsla(-25, 100%, 100%, 1)', -25, 100.25, 100.0001);
  });

  it('should use 0 for alpha if alpha is less than 0', () => {
    shouldReturnHsl('hsla(0, 0%, 0%, 0)', 0, 0, 0, -1);
  });

  it('should use 1 for alpha if alpha is greater than 1', () => {
    shouldReturnHsl('hsla(0, 0%, 0%, 1)', 0, 0, 0, 2);
  });
});
