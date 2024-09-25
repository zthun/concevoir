import { set } from "lodash-es";
import { createSizeChartFixedArithmetic } from "../fixed/size-chart-fixed-arithmetic.mjs";
import { createSizeChartFixedCss } from "../fixed/size-chart-fixed-css.mjs";
import { createSizeChartFixedFibonacci } from "../fixed/size-chart-fixed-fibonacci.mjs";
import { ZSizeChartFixed, ZSizeFixed } from "../fixed/size-fixed.mjs";
import { ZSizeMargin, ZSizeRounding, ZSizeThickness } from "../size.mjs";
import { createSizeChartVariedCss } from "../varied/size-chart-varied-css.mjs";
import { ZSizeVaried } from "../varied/size-varied.mjs";
import { createSizeChartVoidCss } from "../void/size-chart-void-css.mjs";
import { ZSizeVoid } from "../void/size-void.mjs";

/**
 * Represents a tailor that calculates dimensions based on t-shirt sizes.
 */
export interface IZFashionTailor {
  /**
   * Converts a size enum to a spacing value.
   *
   * This is mostly appropriate for margin, padding, and flex/grid gap.
   * This does support a size of Fit, but that only truly works for
   * margin, so be aware of that when requesting the size for padding
   * and gap.
   *
   * @param size -
   *        The size to space out.
   *
   * @returns
   *        A CSS compatible size option.
   */
  gap(size?: ZSizeMargin): string;

  /**
   * Similar to {@link gap}, but uses a smaller multiplier and a smaller
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
  thickness(size?: ZSizeThickness): string;

  /**
   * Similar to {@link gap} but uses sizes that make sense for border radius values.
   *
   * @param size -
   *        The size to round.
   *
   * @returns
   *        A CSS compatible rounding option.
   */
  rounding(size?: ZSizeRounding): string;
}

export class ZFashionTailor {
  private _gaps = {
    ...createSizeChartFixedCss(createSizeChartFixedFibonacci(0.5, 1), "rem"),
    ...createSizeChartVoidCss(),
    [ZSizeVaried.Fit]: "auto",
  };

  private _thickness = {
    ...createSizeChartFixedCss(
      createSizeChartFixedArithmetic(0.0625, 0.0625),
      "rem",
    ),
    ...createSizeChartVoidCss(),
  };

  private _rounding = {
    ...createSizeChartFixedCss(
      createSizeChartFixedArithmetic(0.15, 0.25),
      "rem",
    ),
    ...createSizeChartVoidCss(),
    [ZSizeVaried.Full]: "50%",
  };

  private _sizeChart(
    path: keyof ZFashionTailor,
    chart: ZSizeChartFixed<string>,
  ) {
    const _chart = {
      ...chart,
      ...createSizeChartVoidCss(),
      ...createSizeChartVariedCss(),
    };
    const updated = new ZFashionTailor();
    set(updated, path, _chart);
    return updated;
  }

  public gapsChart = this._sizeChart.bind(this, "_gaps");
  public thicknessChart = this._sizeChart.bind(this, "_thickness");
  public roundingChart = this._sizeChart.bind(this, "_rounding");

  public gap(size: ZSizeMargin = ZSizeFixed.Medium): string {
    return this._gaps[size];
  }

  public thickness(size: ZSizeThickness = ZSizeFixed.ExtraSmall): string {
    return this._thickness[size];
  }

  public rounding(size: ZSizeRounding = ZSizeVoid.None): string {
    return this._rounding[size];
  }
}
