import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import {
  ZHorizontalAnchor,
  ZSideAnchor,
  ZVerticalAnchor,
} from "@zthun/helpful-fn";
import { describe, expect, it } from "vitest";
import { ZDrawerPage } from "./drawer-page";
import { ZDrawerPageComponentModel } from "./drawer-page.cm.mjs";

describe("ZDrawerPage", () => {
  let _setup: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    _setup = new ZCircusSetupRenderer(<ZDrawerPage />);
    _driver = await _setup.setup();
    return ZCircusBy.first(_driver, ZDrawerPageComponentModel);
  }

  async function shouldPositionDrawer(expected: ZSideAnchor) {
    // Arrange.
    const target = await createTestTarget();
    await target.anchor(expected);
    // Act.
    const button = await target.open();
    await button.click();
    const actual = await (await target.drawer()).anchor();
    // Assert.
    expect(actual).toEqual(expected);
  }

  it("should position the drawer on the left", async () => {
    await shouldPositionDrawer(ZHorizontalAnchor.Left);
  });

  it("should position the drawer on the right", async () => {
    await shouldPositionDrawer(ZHorizontalAnchor.Right);
  });

  it("should position the drawer on the top", async () => {
    await shouldPositionDrawer(ZVerticalAnchor.Top);
  });

  it("should position the drawer on the bottom", async () => {
    await shouldPositionDrawer(ZVerticalAnchor.Bottom);
  });

  it("should close the drawer", async () => {
    // Arrange.
    const target = await createTestTarget();
    const open = await target.open();
    await open.click();

    // Act.
    const close = await target.close();
    await close.click();
    const drawer = await target.drawer();
    await drawer.waitForClose();
    const actual = await (await target.drawer()).opened();

    // Assert.
    expect(actual).toBeFalsy();
  });
});
