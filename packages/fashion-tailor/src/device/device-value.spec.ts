import { describe, expect, it } from "vitest";
import { ZDeviceValue, ZDeviceValues } from "./device-value.mjs";

describe("Device Value", () => {
  const shouldReturnValue = (
    expected: string,
    value: ZDeviceValue<string>,
    breakpoint: (t: ZDeviceValues<string>) => string,
  ) => {
    // Arrange.
    const target = new ZDeviceValues(value);

    // Act.
    const actual = breakpoint(target);

    // Assert
    expect(actual).toEqual(expected);
  };

  describe("Raw Value", () => {
    it("should return the value for xl", () => {
      shouldReturnValue("all", "all", (b) => b.xl);
    });

    it("should return the value for lg", () => {
      shouldReturnValue("all", "all", (b) => b.lg);
    });

    it("should return the value for md", () => {
      shouldReturnValue("all", "all", (b) => b.md);
    });

    it("should return the value for sm", () => {
      shouldReturnValue("all", "all", (b) => b.sm);
    });

    it("should return the value for xs", () => {
      shouldReturnValue("all", "all", (b) => b.xs);
    });
  });

  describe("XL", () => {
    it("should return the xl value", () => {
      shouldReturnValue("xl", { xl: "xl" }, (t) => t.xl);
    });
  });

  describe("LG", () => {
    it("should return the lg value", () => {
      shouldReturnValue("lg", { xl: "xl", lg: "lg" }, (t) => t.lg);
    });

    it("should fallback to the xl value", () => {
      shouldReturnValue("xl", { xl: "xl" }, (t) => t.lg);
    });
  });

  describe("MD", () => {
    it("should return the md value", () => {
      shouldReturnValue("md", { xl: "xl", md: "md" }, (t) => t.md);
    });

    it("should fallback to the lg value", () => {
      shouldReturnValue("lg", { xl: "xl", lg: "lg" }, (t) => t.md);
    });

    it("should fallback to the xl value", () => {
      shouldReturnValue("xl", { xl: "xl" }, (t) => t.md);
    });
  });

  describe("SM", () => {
    it("should return the sm value", () => {
      shouldReturnValue("sm", { xl: "xl", sm: "sm" }, (t) => t.sm);
    });

    it("should fallback to the md value", () => {
      shouldReturnValue("md", { xl: "xl", lg: "lg", md: "md" }, (t) => t.sm);
    });

    it("should fallback to the lg value", () => {
      shouldReturnValue("lg", { xl: "xl", lg: "lg" }, (t) => t.sm);
    });

    it("should fallback to the xl value", () => {
      shouldReturnValue("xl", { xl: "xl" }, (t) => t.sm);
    });
  });

  describe("XS", () => {
    it("should return the xs value", () => {
      shouldReturnValue("xs", { xl: "xl", xs: "xs" }, (t) => t.xs);
    });

    it("should fallback to the sm value", () => {
      shouldReturnValue(
        "sm",
        { xl: "xl", lg: "lg", md: "md", sm: "sm" },
        (t) => t.xs,
      );
    });

    it("should fallback to the md value", () => {
      shouldReturnValue("md", { xl: "xl", lg: "lg", md: "md" }, (t) => t.xs);
    });

    it("should fallback to the lg value", () => {
      shouldReturnValue("lg", { xl: "xl", lg: "lg" }, (t) => t.xs);
    });

    it("should fallback to the xl value", () => {
      shouldReturnValue("xl", { xl: "xl" }, (t) => t.xs);
    });
  });
});
