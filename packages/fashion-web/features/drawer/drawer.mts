import { Then, When } from "@cucumber/cucumber";
import { ZSideAnchor } from "@zthun/helpful-fn";
import assert from "assert";
import { ZDrawerPageComponentModel } from "../../src/boutique/drawer/drawer-page.cm.mjs";
import {
  ZFashionRouteBoutique,
  ZFashionRouteDrawer,
} from "../../src/routes.mjs";
import { ZFashionWorld } from "../fashion-world.mjs";

When(
  "I navigate to the drawer demo page",
  async function (this: ZFashionWorld<ZDrawerPageComponentModel>) {
    await this.open(ZFashionRouteBoutique, ZFashionRouteDrawer);
    this.parameters.page = await this.create(ZDrawerPageComponentModel);
  },
);

When(
  "I anchor the drawer to the {string} on the drawer demo page",
  async function (
    this: ZFashionWorld<ZDrawerPageComponentModel>,
    anchor: ZSideAnchor,
  ) {
    const { page } = this.parameters;
    await page.anchor(anchor);
  },
);

When(
  "I click the open button on the drawer demo page",
  async function (this: ZFashionWorld<ZDrawerPageComponentModel>) {
    const { page } = this.parameters;
    await (await page.open()).click();
  },
);

When(
  "I click the close button on the drawer on the drawer demo page",
  async function (this: ZFashionWorld<ZDrawerPageComponentModel>) {
    const { page } = this.parameters;
    const drawer = await page.drawer();
    await drawer.close();
  },
);

Then(
  "the drawer is opened on the {string} on the drawer demo page",
  async function (
    this: ZFashionWorld<ZDrawerPageComponentModel>,
    anchor: "left" | "right" | "top" | "bottom",
  ) {
    const { page } = this.parameters;
    const drawer = await page.drawer();
    const actual = await drawer.anchor();
    assert.equal(actual, anchor);
  },
);

Then(
  "the drawer is closed on the drawer demo page",
  async function (this: ZFashionWorld<ZDrawerPageComponentModel>) {
    const { page } = this.parameters;
    const drawer = await page.drawer();
    await drawer.waitForClose();
    const actual = await drawer.opened();
    assert.equal(actual, false);
  },
);
