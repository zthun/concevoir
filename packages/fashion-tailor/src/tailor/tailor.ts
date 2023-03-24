import { set } from 'lodash';
import { createSizeChartFixedArithmetic } from '../fixed/size-chart-fixed-arithmetic';
import { createSizeChartFixedCss } from '../fixed/size-chart-fixed-css';
import { createSizeChartFixedFibonacci } from '../fixed/size-chart-fixed-fibonacci';
import { ZSizeChartFixed, ZSizeFixed } from '../fixed/size-fixed';
import { createSizeChartVoidCss } from '../void/size-chart-void-css';
import { ZSizeChartVoid, ZSizeVoid } from '../void/size-void';

/**
 * Represents a tailor that calculates dimensions based on t-shirt sizes.
 */
export interface IZFashionTailor {
  /**
   * Converts a size enum to a spacing value.
   *
   * This is mostly appropriate for margin and padding.
   *
   * @param size -
   *        The size to space out.
   *
   * @returns
   *        A CSS compatible size option.
   */
  gap(size?: ZSizeFixed | ZSizeVoid): string;

  /**
   * Similar to gap, but uses a smaller multiplier and a smaller
   * base conversion.
   *
   * This is mostly appropriate for border widths and outlines.
   *
   * @param size -
   *        The size to space out.
   *
   * @returns
   *        A CSS compatible size option.
   */
  thickness(size?: ZSizeFixed | ZSizeVoid): string;
}

export class ZFashionTailor {
  private _gaps: ZSizeChartFixed<string> & ZSizeChartVoid<string> = {
    ...createSizeChartFixedCss(createSizeChartFixedFibonacci(0.5, 1), 'rem'),
    ...createSizeChartVoidCss()
  };

  private _thickness: ZSizeChartFixed<string> & ZSizeChartVoid<string> = {
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(0.0625, 0.0625), 'rem'),
    ...createSizeChartVoidCss()
  };

  private _sizeChart(path: keyof ZFashionTailor, chart: ZSizeChartFixed<string>) {
    const _chart = {
      ...chart,
      ...createSizeChartVoidCss()
    };
    const updated = new ZFashionTailor();
    set(updated, path, _chart);
    return updated;
  }

  public gapsChart = this._sizeChart.bind(this, '_gaps');
  public thicknessChart = this._sizeChart.bind(this, '_thickness');

  gap(size: ZSizeFixed | ZSizeVoid = ZSizeFixed.Medium): string {
    return this._gaps[size];
  }

  thickness(size: ZSizeFixed | ZSizeVoid = ZSizeFixed.ExtraSmall): string {
    return this._thickness[size];
  }
}
