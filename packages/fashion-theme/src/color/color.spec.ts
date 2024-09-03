import { describe, expect, it } from "vitest";
import { brighten, contrast, fromRgb } from "./color.mjs";

describe("Color", () => {
  describe("Lighten", () => {
    it("should lighten", () => {
      expect(brighten(0x2d82e1, 77)).toEqual(0x7acfff);
    });

    it("should lighten to white", () => {
      expect(brighten(0x2d82e1, 255)).toEqual(0xffffff);
    });
  });

  describe("Darken", () => {
    it("should darken", () => {
      expect(brighten(0x2d82e1, -77)).toEqual(0x003594);
    });

    it("should darken to black", () => {
      expect(brighten(0x2d82e1, -255)).toEqual(0x000000);
    });
  });

  describe("Contrast", () => {
    it("should return the contrast ratio", () => {
      expect(contrast(fromRgb(255, 255, 255), fromRgb(0, 0, 255))).toBeCloseTo(
        8.592,
      );
    });

    it("should return a perfect contrast ratio for white on black", () => {
      expect(contrast(0x000000, 0xffffff)).toEqual(21);
    });

    it("should return a perfect contrast radio for black on white", () => {
      expect(contrast(0xffffff, 0x000000)).toEqual(21);
    });
  });
});
