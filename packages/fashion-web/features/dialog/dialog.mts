import { Then, When } from "@cucumber/cucumber";
import { ZSideAnchor } from "@zthun/helpful-fn";
import assert from "assert";
import { ZDialogPageComponentModel } from "../../src/boutique/dialog/dialog-page.cm.mjs";
import {
  ZFashionRouteBoutique,
  ZFashionRouteDialog,
} from "../../src/routes.mjs";
import { ZFashionWorld } from "../fashion-world.mjs";

When(
  "I navigate to the dialog demo page",
  async function (this: ZFashionWorld<ZDialogPageComponentModel>) {
    await this.open(ZFashionRouteBoutique, ZFashionRouteDialog);
    this.parameters.page = await this.create(ZDialogPageComponentModel);
  },
);

When(
  "I anchor the drawer to the {string} on the dialog demo page",
  async function (
    this: ZFashionWorld<ZDialogPageComponentModel>,
    value: ZSideAnchor,
  ) {
    const { page } = this.parameters;
    const anchor = await page.anchor();
    await anchor.select(value);
  },
);

When(
  "I click the drawer button on the dialog demo page",
  async function (this: ZFashionWorld<ZDialogPageComponentModel>) {
    const { page } = this.parameters;
    const button = await page.drawerButton();
    await button.click();
  },
);

When(
  "I click the close button on the drawer on the dialog demo page",
  async function (this: ZFashionWorld<ZDialogPageComponentModel>) {
    const { page } = this.parameters;
    const drawer = await page.drawer();
    await drawer.waitForOpen();
    const closeDrawer = await page.closeDrawer();
    await closeDrawer.click();
  },
);

Then(
  "the drawer is opened on the {string} on the dialog demo page",
  async function (
    this: ZFashionWorld<ZDialogPageComponentModel>,
    anchor: "left" | "right" | "top" | "bottom",
  ) {
    const { page } = this.parameters;
    const drawer = await page.drawer();
    await drawer.waitForOpen();
    const actual = await drawer.anchor();
    assert.equal(actual, anchor);
  },
);

Then(
  "the drawer is closed on the dialog demo page",
  async function (this: ZFashionWorld<ZDialogPageComponentModel>) {
    const { page } = this.parameters;
    const drawer = await page.drawer();
    await drawer.waitForClose();
    const actual = await drawer.opened();
    assert.equal(actual, false);
  },
);
