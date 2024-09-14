import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZOrientation } from "@zthun/helpful-fn";
import { afterEach, describe, expect, it } from "vitest";
import { ZFlex } from "./flex";
import { IZStack, ZStack } from "./stack";
import { ZStackComponentModel } from "./stack.cm.mjs";

describe("ZStack", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget(props?: Partial<IZStack>) {
    _renderer = new ZCircusSetupRenderer(
      (
        <ZStack {...props}>
          <ZFlex grow={1} shrink={0} basis="auto">
            {props?.children}
          </ZFlex>
        </ZStack>
      ),
    );
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZStackComponentModel);
  }

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  describe("Orientation", () => {
    it("should orient vertically by default", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.orientation();
      // Assert.
      expect(actual).toEqual("vertical");
    });

    it("should orient horizontally", async () => {
      // Arrange.
      const orientation = ZOrientation.Horizontal;
      const target = await createTestTarget({ orientation });
      // Act.
      const actual = await target.orientation();
      // Assert.
      expect(actual).toEqual(orientation);
    });
  });

  describe("Inline", () => {
    it("should be inline", async () => {
      // Arrange.
      const inline = true;
      const target = await createTestTarget({ inline });
      // Act.
      const actual = await target.inline();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should be full", async () => {
      // Arrange.
      const inline = false;
      const target = await createTestTarget({ inline });
      // Act.
      const actual = await target.inline();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });
});
