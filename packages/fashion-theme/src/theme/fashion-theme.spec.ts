import { describe, expect, it } from "vitest";
import { black, white } from "../color/rgb.mjs";
import { ZFashionStateBuilder } from "../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../fashion/fashion.mjs";
import { createDarkTheme } from "./dark.mjs";
import { ZFashionThemeBuilder } from "./fashion-theme.mjs";
import { createLightTheme } from "./light.mjs";

describe("ZFashionDesignBuilder", () => {
  function createTestTarget() {
    return new ZFashionThemeBuilder();
  }

  describe("Construction", () => {
    it("should create the light theme", () => {
      expect(createLightTheme()).toBeTruthy();
    });

    it("should create the dark theme", () => {
      expect(createDarkTheme()).toBeTruthy();
    });
  });

  describe("Name", () => {
    it("should set the name", () => {
      const expected = "Test";
      expect(createTestTarget().name(expected).build().name).toEqual(expected);
    });
  });

  describe("Priority", () => {
    it("should set primary", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().primary(expected).build().primary).toEqual(
        expected,
      );
    });

    it("should set secondary", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().secondary(expected).build().secondary).toEqual(
        expected,
      );
    });
  });

  describe("Severity", () => {
    it("should set success", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().success(expected).build().success).toEqual(
        expected,
      );
    });

    it("should set warning", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().warning(expected).build().warning).toEqual(
        expected,
      );
    });

    it("should set error", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().error(expected).build().error).toEqual(
        expected,
      );
    });

    it("should set info", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().info(expected).build().info).toEqual(expected);
    });
  });

  describe("Space", () => {
    it("should set body", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().body(expected).build().body).toEqual(expected);
    });

    it("should set surface", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().surface(expected).build().surface).toEqual(
        expected,
      );
    });

    it("should set component", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().component(expected).build().component).toEqual(
        expected,
      );
    });
  });

  describe("Contrast", () => {
    it("should set light", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().light(expected).build().light).toEqual(
        expected,
      );
    });

    it("should set dark", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().dark(expected).build().dark).toEqual(expected);
    });

    it("should set opposite", () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().opposite(expected).build().opposite).toEqual(
        expected,
      );
    });
  });

  describe("Copy", () => {
    it("should copy another design", () => {
      const primary = new ZFashionBuilder()
        .idle(
          new ZFashionStateBuilder()
            .main(black())
            .contrast(white())
            .border(white())
            .build(),
        )
        .build();
      const expected = createTestTarget().primary(primary).build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
