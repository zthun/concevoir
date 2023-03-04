import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZFashionRouteVenue, ZFashionRouteVenueButton } from '../../src/routes';
import { ZButtonPageComponentModel } from '../../src/venue/button/button-page.cm';
import { ZFashionWorld } from '../fashion-world';

Given('I navigate to the button demo page', async function (this: ZFashionWorld<ZButtonPageComponentModel>) {
  await this.open(ZFashionRouteVenue, ZFashionRouteVenueButton);
  this.parameters.page = await this.create(ZButtonPageComponentModel);
});

When(
  'I click the {string} button on the button page',
  async function (this: ZFashionWorld<ZButtonPageComponentModel>, name: 'button' | 'iconButton') {
    const button = await this.parameters.page[name]();
    await button.click();
  }
);

When(
  'I check the {string} option on the button page',
  async function (
    this: ZFashionWorld<ZButtonPageComponentModel>,
    name: 'disabled' | 'loading' | 'outline' | 'borderless'
  ) {
    const option = await this.parameters.page[name]();
    await option.toggle(true);
  }
);

When(
  'I select the {string} fashion option on the button page',
  async function (this: ZFashionWorld<ZButtonPageComponentModel>, fashion: string) {
    const choice = await this.parameters.page.fashion();
    await choice.select(fashion);
  }
);

Then(
  'the click count should be incremented on the button page',
  async function (this: ZFashionWorld<ZButtonPageComponentModel>) {
    const actual = await this.parameters.page.count();
    assert.equal(actual, 1);
  }
);

Then(
  'the {string} button should be disabled on the button page',
  async function (this: ZFashionWorld<ZButtonPageComponentModel>, name: 'button' | 'iconButton') {
    const button = await this.parameters.page[name]();
    const actual = await button.disabled();
    assert.equal(actual, true);
  }
);

Then(
  'the {string} button should be loading on the button page',
  async function (this: ZFashionWorld<ZButtonPageComponentModel>, name: 'button' | 'iconButton') {
    const button = await this.parameters.page[name]();
    const actual = await button.loading();
    assert.equal(actual, true);
  }
);

Then(
  'the {string} button should be outlined on the button page',
  async function (this: ZFashionWorld<ZButtonPageComponentModel>, name: 'button' | 'iconButton') {
    const button = await this.parameters.page[name]();
    const actual = await button.outlined();
    assert.equal(actual, true);
  }
);

Then(
  'the {string} button should be borderless on the button page',
  async function (this: ZFashionWorld<ZButtonPageComponentModel>, name: 'button' | 'iconButton') {
    const button = await this.parameters.page[name]();
    const actual = await button.borderless();
    assert.equal(actual, true);
  }
);

Then(
  'the fashion on the {string} button should be {string}',
  async function (this: ZFashionWorld<ZButtonPageComponentModel>, name: 'button' | 'iconButton', fashion: string) {
    const button = await this.parameters.page[name]();
    const actual = await button.fashion();
    assert.equal(actual, fashion);
  }
);
