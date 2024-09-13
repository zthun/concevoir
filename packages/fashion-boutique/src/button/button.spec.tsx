import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZFashionBuilder } from "@zthun/fashion-theme";
import { afterEach, describe, expect, it, vi } from "vitest";
import { IZButton, ZButton } from "./button";
import { ZButtonComponentModel } from "./button.cm.mjs";

describe("ZButton", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget(props?: IZButton) {
    _renderer = new ZCircusSetupRenderer(<ZButton {...props} />);
    _driver = await _renderer.setup();
    return await ZCircusBy.first(_driver, ZButtonComponentModel);
  }

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  describe("Content", () => {
    it("should render the button content", async () => {
      // Arrange
      const label = "Test Button";
      const target = await createTestTarget({ label });

      // Act
      const actual = await target.text();

      // Assert
      expect(actual).toEqual(label);
    });

    it("should name the button", async () => {
      // Arrange.
      const name = "button-name";
      const target = await createTestTarget({ name });

      // Act.
      const actual = await target.name();

      // Assert.
      expect(actual).toEqual(name);
    });
  });

  describe("Click", () => {
    it("should raise the onClick event when the button is clicked.", async () => {
      // Arrange.
      const onClick = vi.fn();
      const target = await createTestTarget({ onClick });

      // Act.
      await target.click();

      // Assert
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Disabled", () => {
    async function assertDisabled(
      expected: boolean,
      disabled: boolean | undefined,
    ) {
      // Arrange
      const target = await createTestTarget({ disabled });

      // Act
      const actual = await target.disabled();

      // Assert
      expect(actual).toEqual(expected);
    }

    it("should disable the button when the disabled flag is true.", async () => {
      await assertDisabled(true, true);
    });

    it("should enable the button when the disabled flag is false.", async () => {
      await assertDisabled(false, false);
    });

    it("should enable the button when the disabled flag is undefined.", async () => {
      await assertDisabled(false, undefined);
    });
  });

  describe("Borderless", () => {
    async function assertBorderless(expected: boolean, borderless: boolean) {
      // Arrange
      const target = await createTestTarget({ borderless });
      // Act.
      const actual = await target.borderless();
      // Assert
      expect(!!actual).toEqual(expected);
    }

    it("should keep the border if the borderless flag is false.", async () => {
      await assertBorderless(false, false);
    });

    it("should remove the border if the borderless flag is true.", async () => {
      await assertBorderless(true, true);
    });
  });

  describe("Compact", () => {
    async function assertCompact(expected: boolean, compact: boolean) {
      // Arrange
      const target = await createTestTarget({ compact });

      // Act.
      const actual = await target.compact();

      // Assert
      expect(!!actual).toEqual(expected);
    }

    it("should keep the button fat if the compact flag is false.", async () => {
      await assertCompact(false, false);
    });

    it("should make the button skinny if the compact flag is true.", async () => {
      await assertCompact(true, true);
    });
  });

  describe("Outline", () => {
    async function assertOutline(
      expected: boolean,
      outline: boolean | undefined,
    ) {
      // Arrange
      const target = await createTestTarget({ outline });

      // Act
      const actual = await target.outlined();

      // Assert
      expect(!!actual).toEqual(expected);
    }

    it("should outline the button if the outline flag is true.", async () => {
      await assertOutline(true, true);
    });

    it("should contain the button if the outline flag is false.", async () => {
      await assertOutline(false, false);
    });

    it("should contain the button if the outline flag is undefined.", async () => {
      await assertOutline(false, undefined);
    });
  });

  describe("Fashion", () => {
    it("should set the fashion", async () => {
      // Arrange.
      const fashion = new ZFashionBuilder().name("Test Fashion").build();
      const target = await createTestTarget({ fashion });

      // Act.
      const actual = await target.fashion();

      // Assert.
      expect(actual).toEqual(fashion?.name);
    });
  });
});
