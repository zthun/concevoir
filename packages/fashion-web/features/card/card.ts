import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZCardPageComponentModel } from '../../src/boutique/card/card-page.cm';
import { ZFashionRouteBoutique, ZFashionRouteCard } from '../../src/routes';
import { ZFashionWorld } from '../fashion-world';

Given('I have navigated to the card demo page', async function (this: ZFashionWorld<ZCardPageComponentModel>) {
  await this.open(ZFashionRouteBoutique, ZFashionRouteCard);
  this.parameters.page = await this.create(ZCardPageComponentModel);
});

When(
  'I switch {string} the loading option on the card demo page',
  async function (this: ZFashionWorld<ZCardPageComponentModel>, state: string) {
    const { page } = this.parameters;
    const option = await page.loading();
    const value = state === 'on';
    await option.toggle(!value);
    await option.toggle(value);
  }
);

When(
  'I select the {string} fashion option on the card page',
  async function (this: ZFashionWorld<ZCardPageComponentModel>, color: string) {
    const { page } = this.parameters;
    const fashion = await page.fashion();
    await fashion.select(color);
  }
);

Then(
  'the fashion on the card should be {string} on the card page',
  async function (this: ZFashionWorld<ZCardPageComponentModel>, color: string) {
    const { page } = this.parameters;
    const card = await page.card();
    const fashion = await card.fashion();
    assert.equal(fashion, color);
  }
);

Then(
  'the card loading should be {string} on the card page',
  async function (this: ZFashionWorld<ZCardPageComponentModel>, state: string) {
    const { page } = this.parameters;
    const card = await page.card();
    const expected = state === 'on';
    const loading = await card.loading();
    assert.equal(loading, expected);
  }
);
