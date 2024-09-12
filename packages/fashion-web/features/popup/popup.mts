import { Given, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import { ZPopupPageComponentModel } from "../../src/boutique/popup/popup-page.cm.mjs";
import {
  ZFashionRouteBoutique,
  ZFashionRoutePopup,
} from "../../src/routes.mjs";
import { ZFashionWorld } from "../fashion-world.mjs";

Given(
  "I navigate to the popup demo page",
  async function (this: ZFashionWorld<ZPopupPageComponentModel>) {
    await this.open(ZFashionRouteBoutique, ZFashionRoutePopup);
    this.parameters.page = await this.create(ZPopupPageComponentModel);
  },
);

When(
  "I click the toggler button on the popup demo page",
  async function (this: ZFashionWorld<ZPopupPageComponentModel>) {
    const { page } = this.parameters;
    const toggler = await page.open();
    await toggler.click();
  },
);

Then(
  "the popup is opened on the popup demo page",
  async function (this: ZFashionWorld<ZPopupPageComponentModel>) {
    const { page } = this.parameters;
    const popup = await page.popup();
    const actual = await popup.opened();
    assert.ok(actual);
  },
);
