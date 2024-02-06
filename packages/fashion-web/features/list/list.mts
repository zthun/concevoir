import { Then, When } from '@cucumber/cucumber';
import { ZListLineItemComponentModel } from '@zthun/fashion-boutique';
import assert from 'assert';
import { ZListPageComponentModel } from '../../src/boutique/list/list-page.cm.mjs';
import { ZFashionRouteBoutique, ZFashionRouteList } from '../../src/routes.mjs';
import { ZFashionWorld } from '../fashion-world.mjs';

When('I navigate to the list demo page', async function (this: ZFashionWorld<ZListPageComponentModel>) {
  await this.open(ZFashionRouteBoutique, ZFashionRouteList);
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
