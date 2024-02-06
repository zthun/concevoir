import { describe, expect, it } from 'vitest';
import { createSizeChartVoidCss } from './size-chart-void-css.mjs';
import { createSizeChartVoidZero } from './size-chart-void-zero.mjs';
import { ZSizeChartVoid, ZSizeVoid } from './size-void.mjs';

describe('Void', () => {
  it('should set the sizes', () => {
    // Arrange
    const expected: ZSizeChartVoid<string> = {
      [ZSizeVoid.None]: '0'
    };
    // Act
    const actual = createSizeChartVoidCss();
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should set the sizes to 0.', () => {
    // Arrange
    const expected: ZSizeChartVoid<number> = {
      [ZSizeVoid.None]: 0
    };
    // Act
    const actual = createSizeChartVoidZero();
    // Assert
    expect(actual).toEqual(expected);
  });
});
