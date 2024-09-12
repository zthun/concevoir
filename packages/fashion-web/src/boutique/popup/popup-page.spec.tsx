import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, describe, expect, it } from "vitest";
import { ZPopupPage } from "./popup-page";
import { ZPopupPageComponentModel } from "./popup-page.cm.mjs";

describe("ZPopupPage", () => {
  let _setup: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    _setup = new ZCircusSetupRenderer(<ZPopupPage />);
    _driver = await _setup.setup();
    return ZCircusBy.first(_driver, ZPopupPageComponentModel);
  }

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _setup?.destroy?.call(_setup);
  });

  it("should open the popup", async () => {
    // Arrange.
    const target = await createTestTarget();
    const popup = await target.popup();

    // Act.
    const open = await target.open();
    await open.click();
    await popup.waitForOpen();
    const actual = await popup.opened();

    // Assert.
    expect(actual).toBeTruthy();
  });

  it("should close the popup", async () => {
    // Arrange.
    const target = await createTestTarget();
    const popup = await target.popup();
    const open = await target.open();
    await open.click();
    await popup.waitForOpen();

    // Act.
    const close = await target.close();
    await close.click();
    await popup.waitForClose();
    const actual = await popup.opened();

    // Assert.
    expect(actual).toBeFalsy();
  });
});
