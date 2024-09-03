import { describe, expect, it } from "vitest";
import { createSizeChartFixedArithmetic } from "./size-chart-fixed-arithmetic.mjs";
import { createSizeChartFixedCss } from "./size-chart-fixed-css.mjs";
import { createSizeChartFixedFibonacci } from "./size-chart-fixed-fibonacci.mjs";
import { createSizeChartFixedGeometric } from "./size-chart-fixed-geometric.mjs";
import { ZSizeChartFixed, ZSizeFixed } from "./size-fixed.mjs";

describe("Size Chart Fixed", () => {
  describe("Arithmetic", () => {
    it("should set the sizes", () => {
      // Arrange.
      const expected: ZSizeChartFixed<number> = {
        [ZSizeFixed.ExtraSmall]: 9,
        [ZSizeFixed.Small]: 11,
        [ZSizeFixed.Medium]: 13,
        [ZSizeFixed.Large]: 15,
        [ZSizeFixed.ExtraLarge]: 17,
      };
      // Act.
      const actual = createSizeChartFixedArithmetic(2, 9);
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe("Geometric", () => {
    it("should set the sizes", () => {
      // Arrange
      const expected: ZSizeChartFixed<number> = {
        [ZSizeFixed.ExtraSmall]: 16,
        [ZSizeFixed.Small]: 32,
        [ZSizeFixed.Medium]: 64,
        [ZSizeFixed.Large]: 128,
        [ZSizeFixed.ExtraLarge]: 256,
      };
      // Act.
      const actual = createSizeChartFixedGeometric(2, 16);
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe("Fibonacci", () => {
    it("should set the sizes", () => {
      // Arrange.
      const expected: ZSizeChartFixed<number> = {
        [ZSizeFixed.ExtraSmall]: 5,
        [ZSizeFixed.Small]: 6,
        [ZSizeFixed.Medium]: 11,
        [ZSizeFixed.Large]: 17,
        [ZSizeFixed.ExtraLarge]: 28,
      };
      // Act.
      const actual = createSizeChartFixedFibonacci(5, 6);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it("should set the sizes starting at xs = 1 and sm = 2", () => {
      // Arrange.
      const expected: ZSizeChartFixed<number> = {
        [ZSizeFixed.ExtraSmall]: 1,
        [ZSizeFixed.Small]: 2,
        [ZSizeFixed.Medium]: 3,
        [ZSizeFixed.Large]: 5,
        [ZSizeFixed.ExtraLarge]: 8,
      };
      // Act.
      const actual = createSizeChartFixedFibonacci();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe("CSS", () => {
    it(`should set the sizes for a unit`, () => {
      // Arrange.
      const expected: ZSizeChartFixed<string> = {
        [ZSizeFixed.ExtraSmall]: `1rem`,
        [ZSizeFixed.Small]: `2rem`,
        [ZSizeFixed.Medium]: `3rem`,
        [ZSizeFixed.Large]: `4rem`,
        [ZSizeFixed.ExtraLarge]: `5rem`,
      };
      const base = createSizeChartFixedArithmetic(1, 1);
      // Act.
      const actual = createSizeChartFixedCss(base, "rem");
      // Assert.
      expect(actual).toEqual(expected);
    });
  });
});
