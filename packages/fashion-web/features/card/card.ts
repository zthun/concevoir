import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZCardPageComponentModel } from '../../src/boutique/card/card-page.cm.mjs';
import { ZFashionRouteBoutique, ZFashionRouteCard } from '../../src/routes';
import { ZFashionWorld } from '../fashion-world';

Given('I have navigated to the card demo page', async function (this: ZFashionWorld<ZCardPageComponentModel>) {
  await this.open(ZFashionRouteBoutique, ZFashionRouteCard);
  this.parameters.page = await this.create(ZCardPageComponentModel);
});

When(
  'I select the {string} fashion option on the card page',
  async function (this: ZFashionWorld<ZCardPageComponentModel>, color: string) {
    const { page } = this.parameters;
    const fashion = await page.fashion();
    await fashion.select(color);
  }
);

Then(
  'the {string} card should have a loading state of {string}',
  async function (
    this: ZFashionWorld<ZCardPageComponentModel>,
    card: 'card' | 'loading' | 'image',
    loading: 'true' | 'false'
  ) {
    const { page } = this.parameters;
    const expected = loading === 'true';
    const _card = await page[card]();
    const actual = await _card.loading();

    assert.equal(actual, expected);
  }
);

Then(
  'the fashion on the cards should be {string} on the card page',
  async function (this: ZFashionWorld<ZCardPageComponentModel>, color: string) {
    const { page } = this.parameters;
    const card = await page.card();
    const image = await page.image();
    const loading = await page.loading();
    const cardFashion = await card.fashion();
    const imageFashion = await image.fashion();
    const loadingFashion = await loading.fashion();

    assert.equal(cardFashion, color);
    assert.equal(imageFashion, color);
    assert.equal(loadingFashion, color);
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
