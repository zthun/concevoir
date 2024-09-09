import { describe, expect, it } from "vitest";
import { createSizeChartFixedArithmetic } from "../fixed/size-chart-fixed-arithmetic.mjs";
import { createSizeChartFixedCss } from "../fixed/size-chart-fixed-css.mjs";
import { ZSizeFixed } from "../fixed/size-fixed.mjs";
import { ZSizeVaried } from "../varied/size-varied.mjs";
import { ZSizeVoid } from "../void/size-void.mjs";
import { ZFashionTailor } from "./tailor.mjs";

describe("ZFashionTailor", () => {
  function createTestTarget() {
    return new ZFashionTailor();
  }

  describe("Gap", () => {
    it("should set the gap chart", () => {
      // Arrange.
      const gaps = createSizeChartFixedArithmetic(5, 5);
      const gapCss = createSizeChartFixedCss(gaps, "px");
      const expected = gapCss[ZSizeFixed.Medium];
      const target = createTestTarget();
      // Act.
      const actual = target.gapsChart(gapCss).gap(ZSizeFixed.Medium);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it("should return 0 for a void size", () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.gap(ZSizeVoid.None);
      // Assert.
      expect(actual).toEqual("0");
    });
  });

  describe("Thickness", () => {
    it("should set the thickness chart", () => {
      // Arrange.
      const thickness = createSizeChartFixedArithmetic(1, 2);
      const thicknessCss = createSizeChartFixedCss(thickness, "px");
      const expected = thicknessCss[ZSizeFixed.Medium];
      const target = createTestTarget();
      // Act.
      const actual = target
        .thicknessChart(thicknessCss)
        .thickness(ZSizeFixed.Medium);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it("should return 0 for a void size", () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.thickness(ZSizeVoid.None);
      // Assert.
      expect(actual).toEqual("0");
    });
  });

  describe("Rounding", () => {
    it("should set the rounding chart", () => {
      // Arrange.
      const rounding = createSizeChartFixedArithmetic(1, 1);
      const roundingCss = createSizeChartFixedCss(rounding, "px");
      const expected = roundingCss[ZSizeFixed.Medium];
      const target = createTestTarget();
      // Act.
      const actual = target
        .roundingChart(roundingCss)
        .rounding(ZSizeFixed.Medium);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it("should return 0 for the default value", () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = target.rounding();
      // Assert.
      expect(actual).toEqual("0");
    });

    it("should return circle for a full size", () => {
      // Arrange.
      const target = createTestTarget();

      // Act.
      const actual = target.rounding(ZSizeVaried.Full);

      // Assert.
      expect(actual).toEqual("50%");
    });
  });
});
