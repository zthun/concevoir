import { trimEnd } from "lodash-es";
import { describe, expect, it } from "vitest";
import { ZFontFamily } from "../font/font-family.mjs";
import { ZFontDetectCached } from "./font-detect-cached.mjs";
import { ZFontDetectFontFaceSet } from "./font-detect-font-face-set.mjs";
import { ZFontDetectStatic } from "./font-detect-static.mjs";

describe("Font Detect", () => {
  const SampleFontSet = Object.freeze([
    ZFontFamily.ComicSansMs,
    ZFontFamily.Arial,
    ZFontFamily.Roboto,
  ]);

  describe("Static", () => {
    it("should load available fonts", async () => {
      // Arrange.
      const target = new ZFontDetectCached(
        new ZFontDetectStatic(SampleFontSet),
      );
      const expected = [...SampleFontSet];
      expected.sort();
      // Act.
      await target.detect();
      const fonts = await target.detect();
      // Assert.
      expect(fonts).toEqual(expected);
    });
  });

  describe("FontFaceSet", () => {
    it("should load available fonts", async () => {
      // Arrange.
      // Note - JSDOM does not implement the document.fonts api and it's hard to mock
      // so we're going to cheese it a bit here.
      const face = { family: ZFontFamily.ArialBlack };
      const fontFaceSet: any = [face];
      fontFaceSet.ready = Promise.resolve(fontFaceSet);
      fontFaceSet.check = (f: string) =>
        SampleFontSet.some((e) => trimEnd(f, '"').endsWith(e));
      const target = new ZFontDetectFontFaceSet(fontFaceSet);
      const expected = [...SampleFontSet, ZFontFamily.ArialBlack];
      expected.sort();
      // Act.
      const fonts = await target.detect();
      // Assert.
      expect(fonts).toEqual(expected);
    });
  });
});
