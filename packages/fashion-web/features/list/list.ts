import { Then, When } from '@cucumber/cucumber';
import { ZListLineItemComponentModel } from '@zthun/fashion-boutique';
import assert from 'assert';
import { ZFashionRouteVenue, ZFashionRouteVenueList } from '../../src/routes';
import { ZListPageComponentModel } from '../../src/venue/list/list-page.cm';
import { ZFashionWorld } from '../fashion-world';

When('I navigate to the list demo page', async function (this: ZFashionWorld<ZListPageComponentModel>) {
  await this.open(ZFashionRouteVenue, ZFashionRouteVenueList);
  this.parameters.page = await this.create(ZListPageComponentModel);
});

When(
  'I click the {string} item on the list demo page',
  async function (this: ZFashionWorld<ZListPageComponentModel>, name: string) {
    const { page } = this.parameters;
    const list = await page.list();
    const item = await list.item(name);
    const lineItem = new ZListLineItemComponentModel(item!);
    await lineItem.click();
  }
);

Then('the count should increment on the list demo page', async function (this: ZFashionWorld<ZListPageComponentModel>) {
  const { page } = this.parameters;
  const actual = await page.count();
  assert.equal(actual, 1);
});
