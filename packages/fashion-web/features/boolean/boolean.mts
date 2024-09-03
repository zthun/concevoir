import { Given, Then, When } from "@cucumber/cucumber";
import { ZTrilean } from "@zthun/trilean";
import assert from "assert";
import { ZBooleanPageComponentModel } from "../../src/boutique/boolean/boolean-page.cm.mjs";
import {
  ZFashionRouteBoolean,
  ZFashionRouteBoutique,
} from "../../src/routes.mjs";
import { ZFashionWorld } from "../fashion-world.mjs";

type BooleanPageOption = "disabled" | "required";

Given(
  "I have navigated to the boolean demo page",
  async function (this: ZFashionWorld<ZBooleanPageComponentModel>) {
    await this.open(ZFashionRouteBoutique, ZFashionRouteBoolean);
    this.parameters.page = await this.create(ZBooleanPageComponentModel);
  },
);

When(
  "I click on the {string} while it is {string} on the boolean page",
  async function (
    this: ZFashionWorld<ZBooleanPageComponentModel>,
    demo: "checkbox" | "switch",
    state: "off" | "on" | "indeterminate",
  ) {
    const { page } = this.parameters;
    const bool = await page[demo]();
    const starting = await page[state]();
    await starting.click();
    await bool.toggle();
  },
);

When(
  "I click the {string} button on the boolean page",
  async function (
    this: ZFashionWorld<ZBooleanPageComponentModel>,
    state: "on" | "off" | "indeterminate",
  ) {
    const { page } = this.parameters;
    const button = await page[state]();
    await button.click();
  },
);

When(
  "I toggle the switch for the {string} option to {string} on the boolean page",
  async function (
    this: ZFashionWorld<ZBooleanPageComponentModel>,
    option: BooleanPageOption,
    value: "on" | "off",
  ) {
    const { page } = this.parameters;
    const pageOption = await page[option]();
    const to = value === "on";
    await pageOption.toggle(to);
  },
);

When(
  "I select the {string} fashion option on the boolean page",
  async function (
    this: ZFashionWorld<ZBooleanPageComponentModel>,
    fashion: string,
  ) {
    const choice = await this.parameters.page.fashion();
    await choice.select(fashion);
  },
);

Then(
  "all demo components are checked {string} on the boolean page",
  async function (
    this: ZFashionWorld<ZBooleanPageComponentModel>,
    checked: "on" | "off",
  ) {
    const { page } = this.parameters;
    const checkbox = await page.checkbox();
    const switcher = await page.switch();
    const expected = checked === "on";
    const checkboxValue = await checkbox.value();
    const switchValue = await switcher.value();
    assert.equal(checkboxValue, expected);
    assert.equal(switchValue, expected);
  },
);

Then(
  "all demo components are {string} {string} on the boolean page",
  async function (
    this: ZFashionWorld<ZBooleanPageComponentModel>,
    option: BooleanPageOption,
    value: "on" | "off",
  ) {
    const { page } = this.parameters;
    const checkbox = await page.checkbox();
    const switcher = await page.switch();
    const expected = value === "on";
    const checkboxState = await checkbox[option]();
    const switchState = await switcher[option]();
    assert.equal(checkboxState, expected);
    assert.equal(switchState, expected);
  },
);

Then(
  "the fashion on the {string} should be {string} on the boolean page",
  async function (
    this: ZFashionWorld<ZBooleanPageComponentModel>,
    name: "switch" | "checkbox",
    fashion: string,
  ) {
    const bool = await this.parameters.page[name]();
    const actual = await bool.fashion();
    assert.equal(actual, fashion);
  },
);

Then(
  "all demo components that support the indeterminate state on the page are indeterminate",
  async function (this: ZFashionWorld<ZBooleanPageComponentModel>) {
    const { page } = this.parameters;
    const checkbox = await page.checkbox();
    const value = await checkbox.value();
    assert.equal(value, ZTrilean.Indeterminate);
  },
);

Then(
  "all demo components that do not support the indeterminate state on the page are off",
  async function (this: ZFashionWorld<ZBooleanPageComponentModel>) {
    const { page } = this.parameters;
    const switcher = await page.switch();
    const value = await switcher.value();
    assert.equal(value, false);
  },
);
