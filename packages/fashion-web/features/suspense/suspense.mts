import { Given, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import { ZSuspensePageComponentModel } from "../../src/boutique/suspense/suspense-page.cm.mjs";
import {
  ZFashionRouteBoutique,
  ZFashionRouteSuspense,
} from "../../src/routes.mjs";
import { ZFashionWorld } from "../fashion-world.mjs";

Given(
  "I navigate to the suspense demo page",
  async function (this: ZFashionWorld<ZSuspensePageComponentModel>) {
    await this.open(ZFashionRouteBoutique, ZFashionRouteSuspense);
    this.parameters.page = await this.create(ZSuspensePageComponentModel);
  },
);

When(
  "I set the disabled option to {string} on the suspense demo page",
  async function (
    this: ZFashionWorld<ZSuspensePageComponentModel>,
    value: "checked" | "unchecked",
  ) {
    const checked = value === "checked";
    const { page } = this.parameters;
    const disabled = await page.disabled();
    await disabled.toggle(checked);
  },
);

Then(
  "the {string} suspense should be {string} on the suspense demo page",
  async function (
    this: ZFashionWorld<ZSuspensePageComponentModel>,
    name: "rotate" | "progress",
    visibility: "visible" | "hidden",
  ) {
    const visible = visibility === "visible";
    const { page } = this.parameters;
    const suspense = await page[name]();
    const actual = await suspense.loading();

    assert.equal(actual, visible);
  },
);
