import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZOrientation } from "@zthun/helpful-fn";
import { describe, expect, it } from "vitest";
import { ZStack } from "./stack";
import { ZStackComponentModel } from "./stack.cm.mjs";

describe("ZStack", () => {
  let orientation: ZOrientation | undefined;
  let inline: boolean | undefined;

  async function createTestTarget() {
    const element = <ZStack orientation={orientation} inline={inline} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZStackComponentModel);
  }

  describe("Orientation", () => {
    it("should orient vertically by default", async () => {
      // Arrange.
      orientation = undefined;
      const target = await createTestTarget();
      // Act.
      const actual = await target.orientation();
      // Assert.
      expect(actual).toEqual("vertical");
    });

    it("should orient horizontally", async () => {
      // Arrange.
      orientation = ZOrientation.Horizontal;
      const target = await createTestTarget();
      // Act.
      const actual = await target.orientation();
      // Assert.
      expect(actual).toEqual(orientation);
    });
  });

  describe("Inline", () => {
    it("should be inline", async () => {
      // Arrange.
      inline = true;
      const target = await createTestTarget();
      // Act.
      const actual = await target.inline();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should be full", async () => {
      // Arrange.
      inline = false;
      const target = await createTestTarget();
      // Act.
      const actual = await target.inline();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });
});
