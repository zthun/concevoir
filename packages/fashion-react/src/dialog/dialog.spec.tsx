// @vitest-environment happy-dom

import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import {
  ZButtonComponentModel,
  ZDialogComponentModel,
} from "@zthun/fashion-circus";
import { ZFashionSeverity } from "@zthun/fashion-theme";
import {
  ZHorizontalAnchor,
  ZSideAnchor,
  ZVerticalAnchor,
} from "@zthun/helpful-fn";
import React, { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { ZDialogButton } from "./dialog-button";
import { IZDrawer, ZDrawer } from "./drawer";
import { IZModal, ZModal } from "./modal";
import { IZPopup, ZPopup } from "./popup";
import { IZDialog } from "./use-dialog";

describe("ZDialog", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  const createTestTarget = async (
    renderDialog: (props: IZDialog) => ReactNode,
  ) => {
    const element = <ZDialogButton renderDialog={renderDialog} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return Promise.all([
      ZCircusBy.first(_driver, ZButtonComponentModel),
      ZCircusBy.first(_driver, ZDialogComponentModel),
    ]);
  };

  const shouldRenderDialogHeader = async (
    expected: string,
    renderDialog: (props: IZDialog) => ReactNode,
  ) => {
    // Arrange.
    const [button, modal] = await createTestTarget(renderDialog);
    await button.click();
    await modal.waitForOpen();
    // Act.
    const header = await modal.header();
    const actual = await header.text();
    // Assert.
    expect(actual).toEqual(expected);
  };

  const shouldRenderDialogBody = async (
    expected: string,
    renderDialog: (props: IZDialog) => ReactNode,
  ) => {
    // Arrange.
    const [button, drawer] = await createTestTarget(renderDialog);
    await button.click();
    // Act.
    const actual = await drawer.driver.text();
    // Assert.
    expect(actual).toEqual(expected);
  };

  const shouldRenderDialogFooter = async (
    expected: string,
    renderDialog: (props: IZDialog) => ReactNode,
  ) => {
    // Arrange.
    const [button, modal] = await createTestTarget(renderDialog);
    await button.click();
    await modal.waitForOpen();
    // Act.
    const footer = await modal.footer();
    const actual = await footer.text();
    // Assert.
    expect(actual).toEqual(expected);
  };

  const shouldOpenDialog = async (
    renderDialog: (props: IZDialog) => ReactNode,
  ) => {
    // Arrange.
    const [button, drawer] = await createTestTarget(renderDialog);
    await button.click();
    await drawer.waitForOpen();
    // Act.
    const actual = await drawer.opened();
    // Assert.
    expect(actual).toBeTruthy();
  };

  const shouldCloseDialog = async (
    renderDialog: (props: IZDialog) => ReactNode,
  ) => {
    // Arrange.
    const [button, drawer] = await createTestTarget(renderDialog);
    await button.click();
    await drawer.waitForOpen();
    // Act.
    await drawer.close();
    await drawer.waitForClose();
    const actual = await drawer.opened();
    // Assert.
    expect(actual).toBeFalsy();
  };

  const shouldNotCloseDialog = async (
    renderDialog: (props: IZDialog) => ReactNode,
  ) => {
    // Arrange.
    const [button, dialog] = await createTestTarget(renderDialog);
    await button.click();
    await dialog.waitForOpen();
    // Act.
    await dialog.close();
    const actual = await dialog.opened();
    // Assert.
    expect(actual).toBeTruthy();
  };

  const shouldSetFashion = async (
    expected: string,
    renderDialog: (props: IZDialog) => ReactNode,
  ) => {
    // Arrange.
    const [button, modal] = await createTestTarget(renderDialog);
    await button.click();
    await modal.waitForOpen();
    // Act.
    const actual = await modal.fashion();
    // Assert.
    expect(actual).toEqual(expected);
  };

  describe("ZDrawer", () => {
    const renderDialog = (overrides: Partial<IZDrawer>, props: IZDialog) => (
      <ZDrawer {...props} {...overrides} />
    );

    describe("Content", () => {
      it("should render the header", async () => {
        const header = "Dialog Header";
        const renderHeader = () => header;
        await shouldRenderDialogHeader(
          header,
          renderDialog.bind(null, { renderHeader }),
        );
      });

      it("should render the footer", async () => {
        const footer = "Drawer footer";
        const renderFooter = () => footer;
        await shouldRenderDialogFooter(
          footer,
          renderDialog.bind(null, { renderFooter }),
        );
      });

      it("should render the body", async () => {
        const body = "Drawer Content";
        await shouldRenderDialogBody(
          body,
          renderDialog.bind(null, { children: body }),
        );
      });
    });

    describe("Open/Close", () => {
      it("should open the dialog", async () => {
        await shouldOpenDialog(renderDialog.bind(null, {}));
      });

      it("should close the drawer.", async () => {
        await shouldCloseDialog(renderDialog.bind(null, {}));
      });
    });

    describe("Fashion", () => {
      it("should set the fashion", async () => {
        const fashion = ZFashionSeverity.Success;
        await shouldSetFashion(fashion, renderDialog.bind(null, { fashion }));
      });
    });

    describe("Persistent", () => {
      it("should remain open when escape is pressed", async () => {
        await shouldNotCloseDialog(
          renderDialog.bind(null, { persistent: true }),
        );
      });
    });

    describe("Anchor", () => {
      async function shouldAnchor(expected: ZSideAnchor) {
        // Arrange.
        const [, drawer] = await createTestTarget(
          renderDialog.bind(null, { anchor: expected }),
        );
        // Act.
        const actual = await drawer.anchor();
        // Assert.
        expect(actual).toEqual(expected);
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

  describe("ZModal", () => {
    const renderDialog = (overrides: Partial<IZModal>, props: IZDialog) => (
      <ZModal {...props} {...overrides} />
    );

    describe("Content", () => {
      it("should render the header", async () => {
        const header = "Dialog Header";
        const renderHeader = () => header;
        await shouldRenderDialogHeader(
          header,
          renderDialog.bind(null, { renderHeader }),
        );
      });

      it("should render the footer", async () => {
        const footer = "Drawer footer";
        const renderFooter = () => footer;
        await shouldRenderDialogFooter(
          footer,
          renderDialog.bind(null, { renderFooter }),
        );
      });

      it("should render the body", async () => {
        const body = "Drawer Content";
        await shouldRenderDialogBody(
          body,
          renderDialog.bind(null, { children: body }),
        );
      });
    });

    describe("Open/Close", () => {
      it("should open the dialog", async () => {
        await shouldOpenDialog(renderDialog.bind(null, {}));
      });

      it("should close the drawer.", async () => {
        await shouldCloseDialog(renderDialog.bind(null, {}));
      });
    });

    describe("Fashion", () => {
      it("should set the fashion", async () => {
        const fashion = ZFashionSeverity.Success;
        await shouldSetFashion(fashion, renderDialog.bind(null, { fashion }));
      });
    });

    describe("Persistent", () => {
      it("should remain open when escape is pressed", async () => {
        await shouldNotCloseDialog(
          renderDialog.bind(null, { persistent: true }),
        );
      });
    });
  });

  describe("ZPopup", () => {
    describe("ZModal", () => {
      const renderDialog = (overrides: Partial<IZPopup>, props: IZDialog) => (
        <ZPopup {...props} {...overrides} />
      );

      describe("Content", () => {
        it("should render the header", async () => {
          const header = "Dialog Header";
          const renderHeader = () => header;
          await shouldRenderDialogHeader(
            header,
            renderDialog.bind(null, { renderHeader }),
          );
        });

        it("should render the footer", async () => {
          const footer = "Drawer footer";
          const renderFooter = () => footer;
          await shouldRenderDialogFooter(
            footer,
            renderDialog.bind(null, { renderFooter }),
          );
        });

        it("should render the body", async () => {
          const body = "Drawer Content";
          await shouldRenderDialogBody(
            body,
            renderDialog.bind(null, { children: body }),
          );
        });
      });

      describe("Open/Close", () => {
        it("should open the dialog", async () => {
          await shouldOpenDialog(renderDialog.bind(null, {}));
        });

        it("should close the drawer.", async () => {
          await shouldCloseDialog(renderDialog.bind(null, {}));
        });
      });

      describe("Fashion", () => {
        it("should set the fashion", async () => {
          const fashion = ZFashionSeverity.Success;
          await shouldSetFashion(fashion, renderDialog.bind(null, { fashion }));
        });
      });

      describe("Persistent", () => {
        it("should remain open when escape is pressed", async () => {
          await shouldNotCloseDialog(
            renderDialog.bind(null, { persistent: true }),
          );
        });
      });
    });
  });
});
