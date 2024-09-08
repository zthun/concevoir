import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZSizeVaried } from "@zthun/fashion-tailor";
import { IZFashion, ZFashionBuilder } from "@zthun/fashion-theme";
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ZModal } from "./modal";
import { ZModalComponentModel } from "./modal.cm.mjs";

describe("ZModal", () => {
  let renderHeader: Mock | undefined;
  let renderFooter: Mock | undefined;
  let onClose: Mock | undefined;
  let fashion: IZFashion | undefined;
  let width: ZSizeVaried | undefined;
  let _setup: IZCircusSetup;
  let _driver: IZCircusDriver;
  let _target: ZModalComponentModel;

  const createTestTarget = async () => {
    const element = (
      <ZModal
        open
        renderHeader={renderHeader}
        renderFooter={renderFooter}
        width={width}
        onClose={onClose}
        fashion={fashion}
      />
    );
    _setup = new ZCircusSetupRenderer(element);
    _driver = await _setup.setup();
    _target = await ZCircusBy.first(await _driver.body(), ZModalComponentModel);
    return _target;
  };

  beforeEach(() => {
    fashion = undefined;
    width = undefined;
    renderHeader = undefined;
    renderFooter = undefined;
    onClose = undefined;
  });

  afterEach(async () => {
    await _target?.driver?.destroy?.call(_target.driver);
    await _driver?.destroy?.call(_driver);
    await _setup?.destroy?.call(_setup);
  });

  describe("Header", () => {
    it("should render if set", async () => {
      // Arrange.
      renderHeader = vi.fn();
      const target = await createTestTarget();
      // Act.
      const actual = await target.header();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should not render if no render method is set", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.header();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Footer", () => {
    it("should render if set", async () => {
      // Arrange.
      renderFooter = vi.fn();
      const target = await createTestTarget();
      // Act.
      const actual = await target.footer();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should not render if no render method is set", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.footer();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Width", () => {
    it("should render full screen", async () => {
      // Arrange.
      width = ZSizeVaried.Full;
      const target = await createTestTarget();
      // Act.
      const actual = await target.width();
      // Assert.
      expect(actual).toEqual(width);
    });

    it("should render auto sized", async () => {
      // Arrange.
      width = ZSizeVaried.Fit;
      const target = await createTestTarget();
      // Act.
      const actual = await target.width();
      // Assert.
      expect(actual).toEqual(width);
    });

    it("should render auto sized by default", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.width();
      // Assert.
      expect(actual).toEqual(ZSizeVaried.Fit);
    });
  });

  describe("Close", () => {
    beforeEach(() => {
      onClose = vi.fn();
    });

    it("should close the modal when the backdrop is clicked", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      await target.close();
      // Assert.
      expect(onClose).toHaveBeenCalled();
    });

    it("should close the modal when the escape button is pressed", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      await target.escape();
      // Assert.
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("Fashion", () => {
    it("should set the fashion value", async () => {
      // Arrange.
      const expected = "My Fashion";
      fashion = new ZFashionBuilder().name(expected).build();
      const target = await createTestTarget();
      // Act.
      const actual = await target.fashion();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });
});
