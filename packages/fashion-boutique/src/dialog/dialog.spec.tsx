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
import {
  sleep,
  ZHorizontalAnchor,
  ZSideAnchor,
  ZVerticalAnchor,
} from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import { FunctionComponent } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { ZButton } from "../button/button";
import { ZButtonComponentModel } from "../button/button.cm.mjs";
import { ZDialogComponentModel } from "./dialog.cm.mjs";
import { ZDrawer } from "./drawer";
import { ZModal } from "./modal";
import { IZDialog } from "./use-dialog";

interface IZDialogTestComponent<T> {
  Dialog: FunctionComponent<T>;
  DialogProps?: Partial<T>;
}

function ZDialogTestComponent<T extends IZDialog>(
  props: IZDialogTestComponent<T>,
) {
  const { Dialog, DialogProps } = props;
  const [$open, setOpen] = useAmbassadorState(
    DialogProps?.open,
    undefined,
    false,
  );

  return (
    <>
      <ZButton
        name="open-dialog"
        onClick={setOpen.bind(null, true)}
        label="Open Dialog"
      />
      <Dialog {...(DialogProps as any)} open={$open} />
    </>
  );
}

describe("ZDialog", () => {
  let _setup: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget<T extends IZDialog>(
    Dialog: FunctionComponent<T>,
    props?: Partial<T>,
  ): Promise<[ZButtonComponentModel, ZDialogComponentModel]> {
    const element = (
      <ZDialogTestComponent Dialog={Dialog} DialogProps={props} />
    );
    _setup = new ZCircusSetupRenderer(element);
    _driver = await _setup.setup();
    return [
      await ZCircusBy.first(_driver, ZButtonComponentModel),
      await ZCircusBy.first(_driver, ZDialogComponentModel),
    ];
  }

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _setup?.destroy?.call(_setup);
  });

  const shouldRenderHeader = async (Dialog: FunctionComponent<IZDialog>) => {
    // Arrange.
    const expected = "Header";
    const renderHeader = () => expected;
    const [button, target] = await createTestTarget<IZDialog>(Dialog, {
      renderHeader,
    });

    // Act.
    await button.click();
    await target.waitForOpen();
    const header = await target.header();
    const actual = await header?.text();

    // Assert.
    expect(actual).toEqual(expected);
  };

  const shouldNotRenderHeaderIfNoneSet = async (
    Dialog: FunctionComponent<IZDialog>,
  ) => {
    // Arrange.
    const [button, target] = await createTestTarget(Dialog);
    await button.click();
    await target.waitForOpen();

    // Act.
    const actual = await target.header();

    // Assert.
    expect(actual).toBeFalsy();
  };

  const shouldRenderFooter = async (Dialog: FunctionComponent<IZDialog>) => {
    // Arrange.
    const expected = "Footer";
    const renderFooter = () => expected;
    const [button, target] = await createTestTarget(Dialog, { renderFooter });

    // Act.
    await button.click();
    await target.waitForOpen();
    const footer = await target.footer();
    const actual = await footer?.text();

    // Assert.
    expect(actual).toEqual(expected);
  };

  const shouldNotRenderFooterIfNoneSet = async (
    Dialog: FunctionComponent<IZDialog>,
  ) => {
    // Arrange.
    const [button, target] = await createTestTarget(Dialog);
    await button.click();
    await target.waitForOpen();

    // Act.
    const actual = await target.footer();

    // Assert.
    expect(actual).toBeFalsy();
  };

  const shouldCloseTheDialog = async (Dialog: FunctionComponent<IZDialog>) => {
    // Arrange.
    const [button, target] = await createTestTarget(Dialog);
    await button.click();
    await target.waitForOpen();

    // Act.
    await target.close();
    await target.close();
    await target.waitForClose();
    const actual = await target.opened();

    // Assert.
    expect(actual).toBeFalsy();
  };

  const shouldNotCloseTheDialogOnNonEscapeKeys = async (
    Dialog: FunctionComponent<IZDialog>,
  ) => {
    // Arrange.
    const [button, target] = await createTestTarget(Dialog);
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
  };

  const shouldNotCloseIfTheDialogIfPersistent = async (
    Dialog: FunctionComponent<IZDialog>,
  ) => {
    // Arrange.
    const [button, target] = await createTestTarget(Dialog, {
      persistent: true,
    });
    await button.click();
    await target.waitForOpen();

    // Act.
    await target.close();
    await sleep(1000);
    const actual = await target.opened();

    // Assert.
    expect(actual).toBeTruthy();
  };

  const shouldSetTheDialogFashion = async (
    Dialog: FunctionComponent<IZDialog>,
  ) => {
    // Arrange.
    const expected = "My Fashion";
    const fashion = new ZFashionBuilder().name(expected).build();
    const [, target] = await createTestTarget(Dialog, { fashion });

    // Act.
    const actual = await target.fashion();

    // Assert.
    expect(actual).toEqual(expected);
  };

  describe("Modal", () => {
    const Dialog = ZModal;

    describe("Header", () => {
      it("should render if set", async () => {
        await shouldRenderHeader(Dialog);
      });

      it("should not render if no render method is set", async () => {
        await shouldNotRenderHeaderIfNoneSet(Dialog);
      });
    });

    describe("Footer", () => {
      it("should render if set", async () => {
        await shouldRenderFooter(Dialog);
      });

      it("should not render if no render method is set", async () => {
        await shouldNotRenderFooterIfNoneSet(Dialog);
      });
    });

    describe("Close", () => {
      it("should close the dialog", async () => {
        await shouldCloseTheDialog(Dialog);
      });

      it("should not close the modal on non escape keys", async () => {
        await shouldNotCloseTheDialogOnNonEscapeKeys(Dialog);
      });

      it("should no close if the modal is persistent", async () => {
        await shouldNotCloseIfTheDialogIfPersistent(Dialog);
      });
    });

    describe("Fashion", () => {
      it("should set the fashion value", async () => {
        await shouldSetTheDialogFashion(Dialog);
      });
    });

    describe("Width", () => {
      it("should render full screen", async () => {
        // Arrange.
        const [button, target] = await createTestTarget(Dialog, {
          width: ZSizeVaried.Full,
          height: ZSizeVaried.Full,
        });

        // Act.
        await button.click();
        await target.waitForOpen();
        const actual = await target.opened();

        // Assert.
        expect(actual).toBeTruthy();
      });
    });
  });

  describe("Drawer", () => {
    const Dialog = ZDrawer;

    describe("Header", () => {
      it("should render if set", async () => {
        await shouldRenderHeader(Dialog);
      });

      it("should not render if no render method is set", async () => {
        await shouldNotRenderHeaderIfNoneSet(Dialog);
      });
    });

    describe("Footer", () => {
      it("should render if set", async () => {
        await shouldRenderFooter(Dialog);
      });

      it("should not render if no render method is set", async () => {
        await shouldNotRenderFooterIfNoneSet(Dialog);
      });
    });

    describe("Close", () => {
      it("should close the dialog", async () => {
        await shouldCloseTheDialog(Dialog);
      });

      it("should not close the modal on non escape keys", async () => {
        await shouldNotCloseTheDialogOnNonEscapeKeys(Dialog);
      });

      it("should no close if the modal is persistent", async () => {
        await shouldNotCloseIfTheDialogIfPersistent(Dialog);
      });
    });

    describe("Fashion", () => {
      it("should set the fashion value", async () => {
        await shouldSetTheDialogFashion(Dialog);
      });
    });

    describe("Anchor", () => {
      async function shouldAnchor(anchor: ZSideAnchor) {
        // Arrange.
        const [, target] = await createTestTarget(Dialog, {
          anchor,
        });

        // Act.
        const actual = await target.anchor();
        await target.close();

        // Assert.
        expect(actual).toEqual(anchor);
      }

      it("should anchor to the left", async () => {
        await shouldAnchor(ZHorizontalAnchor.Left);
      });

      it("should anchor to the right", async () => {
        await shouldAnchor(ZHorizontalAnchor.Right);
      });

      it("should anchor to the top", async () => {
        await shouldAnchor(ZVerticalAnchor.Top);
      });

      it("should anchor to the bottom", async () => {
        await shouldAnchor(ZVerticalAnchor.Bottom);
      });
    });
  });
});
