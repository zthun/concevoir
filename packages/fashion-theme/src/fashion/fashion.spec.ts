import { describe, expect, it } from "vitest";
import { fromRgb } from "../color/color.mjs";
import { hsl } from "../color/hsl.mjs";
import { black, rgb, white } from "../color/rgb.mjs";
import { ZFashionStateBuilder } from "./fashion-state.mjs";
import { ZFashionBuilder } from "./fashion.mjs";

describe("ZFashion", () => {
  function createTestTarget() {
    return new ZFashionBuilder();
  }

  describe("Spectrum", () => {
    it("should set the main color", () => {
      const expected = rgb(255, 0, 0);
      expect(
        createTestTarget()
          .spectrum(fromRgb(255, 0, 0))
          .build().idle.main,
      ).toEqual(expected);
    });

    it("should set the contrast to white when it has a higher contrast ratio", () => {
      expect(createTestTarget().spectrum(0).build().idle.contrast).toEqual(
        white(),
      );
    });

    it("should set the contrast to black when it has a higher contrast ratio", () => {
      expect(
        createTestTarget().spectrum(0xffffff).build().idle.contrast,
      ).toEqual(black());
    });

    it("should set the focus state", () => {
      expect(
        createTestTarget().spectrum(0xffffff).build().focus?.main,
      ).toBeTruthy();
    });

    it("should set the hover state", () => {
      expect(
        createTestTarget().spectrum(0xffffff).build().hover?.main,
      ).toBeTruthy();
    });

    it("should set the active state", () => {
      expect(
        createTestTarget().spectrum(0xffffff).build().active?.main,
      ).toBeTruthy();
    });

    it("should set the visited state", () => {
      expect(
        createTestTarget().spectrum(0xffffff).build().visited?.main,
      ).toBeTruthy();
    });
  });

  describe("Copy", () => {
    it("should copy another complementary object", () => {
      const main = hsl(220, 56, 72, 0.32);
      const contrast = white();
      const idle = new ZFashionStateBuilder()
        .main(main)
        .contrast(contrast)
        .build();
      const expected = createTestTarget().idle(idle).build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
