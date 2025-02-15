import { Given, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import { ZTextPageComponentModel } from "../../src/boutique/text/text-page.cm.mjs";
import { ZFashionRouteBoutique, ZFashionRouteText } from "../../src/routes.mjs";
import { ZFashionWorld } from "../fashion-world.mjs";

type FieldName = "text" | "password" | "area";
type OptionName = "disabled" | "readOnly" | "required" | "adornments";

// cspell:disable
const LOREM1 = "Lorem ipsum dolor sit amet.";
const LOREM2 = "Consectetur adipiscing elit, sed do eiusmod tempor incididunt.";
const LOREM3 =
  "Ut labore et dolore magna aliqua. Massa sed elementum tempus egestas sed.";
// cspell:enable

Given(
  "I navigate to the text demo page",
  async function (this: ZFashionWorld<ZTextPageComponentModel>) {
    await this.open(ZFashionRouteBoutique, ZFashionRouteText);
    this.parameters.page = await this.create(ZTextPageComponentModel);
  },
);

When(
  "I enter multiple lines into the text area on the text demo page",
  async function (this: ZFashionWorld<ZTextPageComponentModel>) {
    const area = await this.parameters.page.area();
    await area.essay([LOREM1, LOREM2, LOREM3]);
  },
);

When(
  "I enter the text {string} into the {string} field on the text demo page",
  async function (
    this: ZFashionWorld<ZTextPageComponentModel>,
    text: string,
    name: FieldName,
  ) {
    const field = await this.parameters.page[name]();
    await field.keyboard(text);
  },
);

When(
  "I check the {string} option on the text demo page",
  async function (
    this: ZFashionWorld<ZTextPageComponentModel>,
    name: OptionName,
  ) {
    const option = await this.parameters.page[name]();
    await option.toggle(true);
  },
);

Then(
  "the value of the {string} field should be {string} on the text demo page",
  async function (
    this: ZFashionWorld<ZTextPageComponentModel>,
    name: FieldName,
    expected: string,
  ) {
    const field = await this.parameters.page[name]();
    const actual = await field.value();
    assert.equal(actual, expected);
  },
);

Then(
  "the {string} field is disabled on the text demo page",
  async function (
    this: ZFashionWorld<ZTextPageComponentModel>,
    name: FieldName,
  ) {
    const field = await this.parameters.page[name]();
    const actual = await field.disabled();
    assert.equal(actual, true);
  },
);

Then(
  "the {string} field is read only on the text demo page",
  async function (
    this: ZFashionWorld<ZTextPageComponentModel>,
    name: FieldName,
  ) {
    const field = await this.parameters.page[name]();
    const actual = await field.readOnly();
    assert.equal(actual, true);
  },
);

Then(
  "the {string} field is required on the text demo page",
  async function (
    this: ZFashionWorld<ZTextPageComponentModel>,
    name: FieldName,
  ) {
    const field = await this.parameters.page[name]();
    const actual = await (await field.label())?.required();
    assert.equal(actual, true);
  },
);

Then(
  "the {string} field has adornments on the text demo page",
  async function (
    this: ZFashionWorld<ZTextPageComponentModel>,
    name: FieldName,
  ) {
    const field = await this.parameters.page[name]();
    const prefix = await field.prefix();
    const suffix = await field.suffix();
    const actual = prefix != null && suffix != null;
    assert.equal(actual, true);
  },
);

Then(
  "the value of area should be separated by two new lines on the text demo page",
  async function (this: ZFashionWorld<ZTextPageComponentModel>) {
    const sep = "\\n\\n";
    const expected = [LOREM1, LOREM2, LOREM3].join(sep).concat(sep);
    const value = await this.parameters.page.value();
    assert.equal(value, expected);
  },
);
