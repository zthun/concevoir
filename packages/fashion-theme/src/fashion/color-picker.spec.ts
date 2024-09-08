import { describe, expect, it } from "vitest";
import { ZColor } from "../color/color.mjs";
import { ZColorPicker } from "./color-picker.mjs";
import { IZFashionState } from "./fashion-state.mjs";
import { IZFashion, ZFashionBuilder } from "./fashion.mjs";

describe("FashionColorPicker", () => {
  const box = new ZFashionBuilder().spectrum(0x888888).build();

  const createTestTarget = (fashion: IZFashion) => new ZColorPicker(fashion);

  const shouldReturnColor = (
    expected: ZColor | undefined,
    fashion: IZFashion,
    actualFn: (t: ZColorPicker) => ZColor,
  ) => {
    // Arrange.
    const target = createTestTarget(fashion);

    // Act.
    const actual = actualFn(target);

    // Assert.
    expect(actual).toEqual(expected);
  };

  const shouldFallbackToIdle = (
    expected: keyof IZFashionState,
    state: keyof Omit<IZFashion, "name">,
    part: keyof IZFashionState,
  ) => {
    const _box = new ZFashionBuilder().copy(box).build();
    const _state = _box[state];
    delete _state![part];
    shouldReturnColor(_box.idle[expected], _box, (t) => t[state][part]);
  };

  describe("Idle", () => {
    describe("Main", () => {
      it("should return main", () => {
        shouldReturnColor(box.idle.main, box, (t) => t.idle.main);
      });
    });

    describe("Contrast", () => {
      it("should return contrast", () => {
        shouldReturnColor(box.idle.contrast, box, (t) => t.idle.contrast);
      });
    });

    describe("Border", () => {
      it("should return border", () => {
        shouldReturnColor(box.idle.border!, box, (t) => t.idle.border);
      });

      it("should return main if no border exists", () => {
        shouldFallbackToIdle("main", "idle", "border");
      });
    });
  });

  describe("Hover", () => {
    describe("Main", () => {
      it("should return main", () => {
        shouldReturnColor(box.hover!.main!, box, (t) => t.hover.main);
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("main", "hover", "main");
      });
    });

    describe("Contrast", () => {
      it("should return contrast", () => {
        shouldReturnColor(box.hover!.contrast!, box, (t) => t.hover.contrast);
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("contrast", "hover", "contrast");
      });
    });

    describe("Border", () => {
      it("should return border", () => {
        shouldReturnColor(box.hover!.border!, box, (t) => t.hover.border);
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("border", "hover", "border");
      });
    });
  });

  describe("Focus", () => {
    describe("Main", () => {
      it("should return main", () => {
        shouldReturnColor(box.focus!.main!, box, (t) => t.focus.main);
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("main", "focus", "main");
      });
    });

    describe("Contrast", () => {
      it("should return contrast", () => {
        shouldReturnColor(box.focus!.contrast!, box, (t) => t.focus.contrast);
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("contrast", "focus", "contrast");
      });
    });

    describe("Border", () => {
      it("should return border", () => {
        shouldReturnColor(box.focus!.border!, box, (t) => t.focus.border);
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("border", "focus", "border");
      });
    });
  });

  describe("Active", () => {
    describe("Main", () => {
      it("should return main", () => {
        shouldReturnColor(box.active!.main!, box, (t) => t.active.main);
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("main", "active", "main");
      });
    });

    describe("Contrast", () => {
      it("should return contrast", () => {
        shouldReturnColor(box.active!.contrast!, box, (t) => t.active.contrast);
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("contrast", "active", "contrast");
      });
    });

    describe("Border", () => {
      it("should return border", () => {
        shouldReturnColor(box.active!.border!, box, (t) => t.active.border);
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("border", "active", "border");
      });
    });
  });

  describe("Visited", () => {
    describe("Main", () => {
      it("should return main", () => {
        shouldReturnColor(box.visited!.main!, box, (t) => t.visited.main);
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("main", "visited", "main");
      });
    });

    describe("Contrast", () => {
      it("should return contrast", () => {
        shouldReturnColor(
          box.visited!.contrast!,
          box,
          (t) => t.visited.contrast,
        );
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("contrast", "visited", "contrast");
      });
    });

    describe("Border", () => {
      it("should return border", () => {
        shouldReturnColor(box.visited!.border!, box, (t) => t.visited.border);
      });

      it("should fallback to idle", () => {
        shouldFallbackToIdle("border", "visited", "border");
      });
    });
  });
});
