import { Then, When } from "@cucumber/cucumber";
import assert from "assert";
import { ZChoicePageComponentModel } from "../../src/boutique/choice/choice-page.cm.mjs";
import {
  ZFashionRouteBoutique,
  ZFashionRouteChoice,
} from "../../src/routes.mjs";
import { ZFashionWorld } from "../fashion-world.mjs";

type ChoiceDemo = "dropdown" | "toggle";
type OptionCheckbox = "multiple" | "disabled" | "indelible" | "required";

When(
  "I navigate to the choice demo page",
  async function (this: ZFashionWorld<ZChoicePageComponentModel>) {
    await this.open(ZFashionRouteBoutique, ZFashionRouteChoice);
    this.parameters.page = await this.create(ZChoicePageComponentModel);
  },
);

When(
  "I clear the existing selection on the {string} on the choice demo page",
  async function (
    this: ZFashionWorld<ZChoicePageComponentModel>,
    demo: ChoiceDemo,
  ) {
    const choice = await this.parameters.page[demo]();
    await choice.clear();
  },
);

When(
  "I select {string} on the {string} on the choice demo page",
  async function (
    this: ZFashionWorld<ZChoicePageComponentModel>,
    text: string,
    name: ChoiceDemo,
  ) {
    const choice = await this.parameters.page[name]();
    await choice.select(text);
  },
);

When(
  "I check the {string} option on the choice demo page",
  async function (
    this: ZFashionWorld<ZChoicePageComponentModel>,
    name: OptionCheckbox,
  ) {
    const option = await this.parameters.page[name]();
    await option.toggle(true);
  },
);

Then(
  "the values should be updated to {string} on the choice demo page",
  async function (
    this: ZFashionWorld<ZChoicePageComponentModel>,
    values: string,
  ) {
    const list = await this.parameters.page.value();
    const actual = list.join(",");
    assert.equal(actual, values);
  },
);

Then(
  "the {string} should be disabled on the choice demo page",
  async function (
    this: ZFashionWorld<ZChoicePageComponentModel>,
    name: ChoiceDemo,
  ) {
    const choice = await this.parameters.page[name]();
    const actual = await choice.disabled();
    assert.ok(actual);
  },
);

Then(
  "the {string} should be indelible on the choice demo page",
  async function (
    this: ZFashionWorld<ZChoicePageComponentModel>,
    name: ChoiceDemo,
  ) {
    const choice = await this.parameters.page[name]();
    await choice.clear();
    const actual = await this.parameters.page.value();
    assert.ok(actual.length > 0);
  },
);

Then(
  "the {string} label should be required on the choice demo page",
  async function (
    this: ZFashionWorld<ZChoicePageComponentModel>,
    name: ChoiceDemo,
  ) {
    const choice = await this.parameters.page[name]();
    const label = await choice.label();
    const actual = await label?.required();
    assert.ok(actual);
  },
);
