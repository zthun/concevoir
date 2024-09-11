import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZButtonComponentModel } from "@zthun/fashion-boutique";
import { ZFashionName, ZFashionPriority } from "@zthun/fashion-theme";
import { required } from "@zthun/helpful-fn";
import { lowerCase } from "lodash-es";
import { afterEach, describe, expect, it } from "vitest";
import { ZModalPage } from "./modal-page";
import { ZModalPageComponentModel } from "./modal-page.cm.mjs";

describe("ZModalPage", () => {
  let _setup: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async () => {
    const element = <ZModalPage />;

    _setup = new ZCircusSetupRenderer(element);
    _driver = await _setup.setup();
    return ZCircusBy.first(_driver, ZModalPageComponentModel);
  };

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _setup?.destroy?.call(_setup);
  });

  describe("Header", () => {
    const shouldShowHeader = async (expected: boolean) => {
      // Arrange.
      const target = await createTestTarget();
      const header = await target.header();
      await header.toggle(expected);
      // Act.
      const modal = await target.openModal();
      const actual = await modal.header();
      await modal.close();
      // Assert.
      expect(!!actual).toEqual(expected);
    };

    it("should not show if the switch is off", async () => {
      await shouldShowHeader(false);
    });

    it("should show if the switch is on", async () => {
      await shouldShowHeader(true);
    });
  });

  describe("Footer", () => {
    const shouldShowFooter = async (expected: boolean) => {
      // Arrange.
      const target = await createTestTarget();
      const footer = await target.footer();
      await footer.toggle(expected);
      // Act.
      const modal = await target.openModal();
      const actual = await modal.footer();
      await modal.close();
      // Assert.
      expect(!!actual).toEqual(expected);
    };

    it("should not show if the switch is off", async () => {
      await shouldShowFooter(false);
    });

    it("should show if the switch is on", async () => {
      await shouldShowFooter(true);
    });
  });

  describe("Close", () => {
    const shouldCloseModal = async (name: "cancel" | "save") => {
      // Arrange.
      const target = await createTestTarget();
      await (await target.footer()).toggle(true);
      const modal = await target.openModal();
      const footer = await required(modal.footer());
      const button = await ZCircusBy.first(footer, ZButtonComponentModel, name);

      // Act.
      await button.click();
      await modal.waitForClose();
      const actual = await modal.opened();

      // Assert.
      expect(actual).toBeFalsy();
    };

    it("should be invoked with the cancel button", async () => {
      await shouldCloseModal("cancel");
    });

    it("should be invoked with the save button", async () => {
      await shouldCloseModal("save");
    });
  });

  describe("Fashion", () => {
    const shouldSetFashion = async (expected: ZFashionName) => {
      // Arrange.
      const target = await createTestTarget();
      const fashion = await target.fashion();
      // Act.
      await fashion.select(expected);
      const modal = await target.openModal();
      const actual = await modal.fashion();
      await modal.close();
      // Assert.
      expect(lowerCase(actual!)).toEqual(expected);
    };

    it("should set the fashion to primary", async () => {
      await shouldSetFashion(ZFashionPriority.Primary);
    });

    it("should set the fashion to secondary", async () => {
      await shouldSetFashion(ZFashionPriority.Secondary);
    });
  });
});
