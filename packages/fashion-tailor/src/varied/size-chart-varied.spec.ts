import { describe, expect, it } from 'vitest';
import { createSizeChartVariedCss } from './size-chart-varied-css.mjs';
import { ZSizeChartVaried, ZSizeVaried } from './size-varied.mjs';

describe('Size Chart Varied', () => {
  it('should set the sizes', () => {
    // Arrange.
    const expected: ZSizeChartVaried<string> = {
      [ZSizeVaried.Fit]: 'auto',
      [ZSizeVaried.Full]: '100%'
    };
    // Act.
    const actual = createSizeChartVariedCss();
    // Assert.
    expect(actual).toEqual(expected);
  });
});
