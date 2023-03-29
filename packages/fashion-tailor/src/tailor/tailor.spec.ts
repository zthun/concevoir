import { describe, expect, it } from 'vitest';
import { createSizeChartFixedArithmetic } from '../fixed/size-chart-fixed-arithmetic';
import { createSizeChartFixedCss } from '../fixed/size-chart-fixed-css';
import { ZSizeFixed } from '../fixed/size-fixed';
import { ZSizeVoid } from '../void/size-void';
import { ZFashionTailor } from './tailor';

describe('ZFashionTailor', () => {
  function createTestTarget() {
    return new ZFashionTailor();
  }

  describe('Gap', () => {
    it('should set the gap chart', () => {
      // Arrange.
      const gaps = createSizeChartFixedCss(createSizeChartFixedArithmetic(5, 5), 'px');
      const expected = gaps[ZSizeFixed.Medium];
      const target = createTestTarget();
      // Act.
      const actual = target.gapsChart(gaps).gap(ZSizeFixed.Medium);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should return 0 for a void size', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.gap(ZSizeVoid.None);
      // Assert.
      expect(actual).toEqual('0');
    });
  });

  describe('Thickness', () => {
    it('should set the thickness chart', () => {
      // Arrange.
      const thickness = createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 2), 'px');
      const expected = thickness[ZSizeFixed.Medium];
      const target = createTestTarget();
      // Act.
      const actual = target.thicknessChart(thickness).thickness(ZSizeFixed.Medium);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should return 0 for a void size', () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.thickness(ZSizeVoid.None);
      // Assert.
      expect(actual).toEqual('0');
    });
  });
});
