import {
  IZCircusDriver,
  IZCircusSetup,
  ZCircusActBuilder,
  ZCircusBy,
  ZCircusKeyboardQwerty,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZSizeVaried } from "@zthun/fashion-tailor";
import { ZFashionBuilder } from "@zthun/fashion-theme";
import { sleep } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import { ZButtonComponentModel } from "src/button/button.cm.mjs";
import { afterEach, describe, expect, it } from "vitest";
import { ZButton } from "../button/button";
import { ZDialogComponentModel } from "./dialog.cm.mjs";
import { IZModal, ZModal } from "./modal";
import { ZModalComponentModel } from "./modal.cm.mjs";

describe("ZModal", () => {
  let _setup: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async (
    props: Partial<Omit<IZModal, "onClose">> = {},
  ): Promise<[ZButtonComponentModel, ZDialogComponentModel]> => {
    const { open, ...rest } = props;
    const ModalTest = () => {
      const [$open, setOpen] = useAmbassadorState(open, undefined, false);

      return (
        <>
          <ZButton
            name="open-dialog"
            onClick={setOpen.bind(null, true)}
            label="Open Dialog"
          />
          <ZModal {...rest} open={$open} onClose={setOpen.bind(null, false)} />
        </>
      );
    };

    _setup = new ZCircusSetupRenderer(<ModalTest />);
    _driver = await _setup.setup();
    return [
      await ZCircusBy.first(_driver, ZButtonComponentModel),
      await ZCircusBy.first(_driver, ZModalComponentModel),
    ];
  };

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _setup?.destroy?.call(_setup);
  });

  describe("Header", () => {
    it("should render if set", async () => {
      // Arrange.
      const expected = "Header";
      const renderHeader = () => expected;
      const [button, target] = await createTestTarget({ renderHeader });
      // Act.
      await button.click();
      await target.waitForOpen();
      const header = await target.header();
      const actual = await header?.text();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it("should not render if no render method is set", async () => {
      // Arrange.
      const [button, target] = await createTestTarget();
      await button.click();
      await target.waitForOpen();

      // Act.
      const actual = await target.header();

      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Footer", () => {
    it("should render if set", async () => {
      // Arrange.
      const expected = "Footer";
      const renderFooter = () => expected;
      const [button, target] = await createTestTarget({ renderFooter });

      // Act.
      await button.click();
      await target.waitForOpen();
      const footer = await target.footer();
      const actual = await footer?.text();

      // Assert.
      expect(actual).toEqual(expected);
    });

    it("should not render if no render method is set", async () => {
      // Arrange.
      const [button, target] = await createTestTarget();
      await button.click();
      await target.waitForOpen();

      // Act.
      const actual = await target.footer();

      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Close", () => {
    it("should close the modal", async () => {
      // Arrange.
      const [button, target] = await createTestTarget({
        width: ZSizeVaried.Full,
        height: ZSizeVaried.Full,
      });
      await button.click();
      await target.waitForOpen();

      // Act.
      await target.close();
      await target.close();
      await target.waitForClose();
      const actual = await target.opened();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should not close the modal on non escape keys", async () => {
      // Arrange.
      const [button, target] = await createTestTarget();
      await button.click();
      await target.waitForOpen();
      const { driver } = target;

      // Act.
      const act = new ZCircusActBuilder().press(ZCircusKeyboardQwerty.enter, 5);
      await driver.perform(act.build());
      await sleep(500);
      const actual = await target.opened();

      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should no close if the modal is persistent", async () => {
      // Arrange.
      const [button, target] = await createTestTarget({ persistent: true });
      await button.click();
      await target.waitForOpen();

      // Act.
      await target.close();
      await sleep(1000);
      const actual = await target.opened();

      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe("Fashion", () => {
    it("should set the fashion value", async () => {
      // Arrange.
      const expected = "My Fashion";
      const fashion = new ZFashionBuilder().name(expected).build();
      const [, target] = await createTestTarget({ fashion });
      // Act.
      const actual = await target.fashion();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });
});
