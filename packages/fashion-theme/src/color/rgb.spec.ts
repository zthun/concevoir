import { describe, expect, it } from 'vitest';
import { rgb } from './rgb';

describe('RGB', () => {
  function shouldReturnRgb(expected: string, r: number, g: number, b: number, a?: number) {
    // Arrange.
    // Act.
    const actual = rgb(r, g, b, a);
    // Assert.
    expect(actual).toEqual(expected);
  }

  it('should return the rgb value', () => {
    shouldReturnRgb('rgba(239, 66, 112, 0.25)', 239, 66, 112, 0.25);
  });

  it('should drop the decimals for rgb', () => {
    shouldReturnRgb('rgba(239, 66, 112, 0.25)', 239.22, 66.01, 112.99, 0.25);
  });

  it('should use 0 if r,g,b values are less than 0', () => {
    shouldReturnRgb('rgba(0, 0, 0, 1)', -1, -1, -1);
  });

  it('should use 255 if r,g,b values are greater than 255', () => {
    shouldReturnRgb('rgba(255, 255, 255, 1)', 256, 256, 256);
  });

  it('should use 0 for alpha if alpha is less than 0', () => {
    shouldReturnRgb('rgba(255, 255, 255, 0)', 255, 255, 255, -1);
  });

  it('should use 1 for alpha if alpha is greater than 1', () => {
    shouldReturnRgb('rgba(0, 0, 0, 1)', 0, 0, 0, 2);
  });
});
