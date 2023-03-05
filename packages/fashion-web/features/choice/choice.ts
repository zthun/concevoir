import { Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZFashionRouteVenue, ZFashionRouteVenueChoice } from '../../src/routes';
import { ZChoicePageComponentModel } from '../../src/venue/choice/choice-page.cm';
import { ZFashionWorld } from '../fashion-world';

type ChoiceDemo = 'dropdown' | 'autocomplete';
type OptionCheckbox = 'multiple' | 'disabled' | 'indelible';

When('I navigate to the choice demo page', async function (this: ZFashionWorld<ZChoicePageComponentModel>) {
  await this.open(ZFashionRouteVenue, ZFashionRouteVenueChoice);
  this.parameters.page = await this.create(ZChoicePageComponentModel);
});

When(
  'I clear the existing selection on the {string} on the choice demo page',
  async function (this: ZFashionWorld<ZChoicePageComponentModel>, name: 'dropdown' | 'autocomplete') {
    const choice = await this.parameters.page[name]();
    await choice.clear();
  }
);

When(
  'I select {string} on the {string} on the choice demo page',
  async function (this: ZFashionWorld<ZChoicePageComponentModel>, text: string, name: ChoiceDemo) {
    const choice = await this.parameters.page[name]();
    await choice.select(text);
  }
);

When(
  'I check the {string} option on the choice demo page',
  async function (this: ZFashionWorld<ZChoicePageComponentModel>, name: OptionCheckbox) {
    const option = await this.parameters.page[name]();
    await option.toggle(true);
  }
);

Then(
  'the values should be updated to {string} on the choice demo page',
  async function (this: ZFashionWorld<ZChoicePageComponentModel>, values: string) {
    const list = await this.parameters.page.value();
    const actual = list.join(',');
    assert.equal(actual, values);
  }
);

Then(
  'the {string} should be disabled on the choice demo page',
  async function (this: ZFashionWorld<ZChoicePageComponentModel>, name: ChoiceDemo) {
    const choice = await this.parameters.page[name]();
    const actual = await choice.disabled();
    assert.ok(actual);
  }
);

Then(
  'the {string} should be indelible',
  async function (this: ZFashionWorld<ZChoicePageComponentModel>, name: ChoiceDemo) {
    const choice = await this.parameters.page[name]();
    await choice.clear();
    const actual = await this.parameters.page.value();
    assert.ok(actual.length > 0);
  }
);
