import { Given, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import { ZCardPageComponentModel } from "../../src/boutique/card/card-page.cm.mjs";
import { ZFashionRouteBoutique, ZFashionRouteCard } from "../../src/routes.mjs";
import { ZFashionWorld } from "../fashion-world.mjs";

Given(
  "I have navigated to the card demo page",
  async function (this: ZFashionWorld<ZCardPageComponentModel>) {
    await this.open(ZFashionRouteBoutique, ZFashionRouteCard);
    this.parameters.page = await this.create(ZCardPageComponentModel);
  },
);

When(
  "I select the {string} fashion option on the card page",
  async function (this: ZFashionWorld<ZCardPageComponentModel>, color: string) {
    const { page } = this.parameters;
    const fashion = await page.fashion();
    await fashion.select(color);
  },
);

Then(
  "the fashion on the cards should be {string} on the card page",
  async function (this: ZFashionWorld<ZCardPageComponentModel>, color: string) {
    const { page } = this.parameters;
    const card = await page.card();
    const actual = await card.fashion();

    assert.equal(actual, color);
  },
);
