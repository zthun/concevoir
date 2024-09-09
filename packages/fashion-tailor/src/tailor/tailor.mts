import { set } from "lodash-es";
import { createSizeChartFixedArithmetic } from "../fixed/size-chart-fixed-arithmetic.mjs";
import { createSizeChartFixedCss } from "../fixed/size-chart-fixed-css.mjs";
import { createSizeChartFixedFibonacci } from "../fixed/size-chart-fixed-fibonacci.mjs";
import { ZSizeChartFixed, ZSizeFixed } from "../fixed/size-fixed.mjs";
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
   * This is mostly appropriate for margin and padding.
   *
   * @param size -
   *        The size to space out.
   *
   * @returns
   *        A CSS compatible size option.
   */
  gap(size?: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit): string;

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

  private _sizeChart(
    path: keyof ZFashionTailor,
    chart: ZSizeChartFixed<string>,
  ) {
    const _chart = {
      ...chart,
      ...createSizeChartVoidCss(),
    };
    const updated = new ZFashionTailor();
    set(updated, path, _chart);
    return updated;
  }

  public gapsChart = this._sizeChart.bind(this, "_gaps");
  public thicknessChart = this._sizeChart.bind(this, "_thickness");

  gap(
    size: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit = ZSizeFixed.Medium,
  ): string {
    return this._gaps[size];
  }

  thickness(size: ZSizeFixed | ZSizeVoid = ZSizeFixed.ExtraSmall): string {
    return this._thickness[size];
  }
}
