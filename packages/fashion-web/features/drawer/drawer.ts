import { Then, When } from '@cucumber/cucumber';
import { ZAnchor } from '@zthun/fashion-chroma';
import assert from 'assert';
import { ZFashionRouteVenue, ZFashionRouteVenueDrawer } from '../../src/routes';
import { ZDrawerPageComponentModel } from '../../src/venue/drawer/drawer-page.cm';
import { ZFashionWorld } from '../fashion-world';

When('I navigate to the drawer demo page', async function (this: ZFashionWorld<ZDrawerPageComponentModel>) {
  await this.open(ZFashionRouteVenue, ZFashionRouteVenueDrawer);
  this.parameters.page = await this.create(ZDrawerPageComponentModel);
});

When(
  'I anchor the drawer to the {string} on the drawer demo page',
  async function (this: ZFashionWorld<ZDrawerPageComponentModel>, anchor: ZAnchor) {
    const { page } = this.parameters;
    await page.anchor(anchor);
  }
);

When(
  'I click the drawer button on the drawer demo page',
  async function (this: ZFashionWorld<ZDrawerPageComponentModel>) {
    const { page } = this.parameters;
    await (await page.drawerButton()).open();
  }
);

When(
  'I click the close button on the drawer on the drawer demo page',
  async function (this: ZFashionWorld<ZDrawerPageComponentModel>) {
    const { page } = this.parameters;
    const drawer = await (await page.drawerButton()).open();
    await page.close(drawer);
  }
);

Then(
  'the drawer is opened on the {string} on the drawer demo page',
  async function (this: ZFashionWorld<ZDrawerPageComponentModel>, anchor: ZAnchor) {
    const { page } = this.parameters;
    const btn = await page.drawerButton();
    const drawer = await btn.drawer();
    const actual = await drawer.anchor();
    assert.equal(actual, anchor);
  }
);

Then('the drawer is closed on the drawer demo page', async function (this: ZFashionWorld<ZDrawerPageComponentModel>) {
  const { page } = this.parameters;
  const actual = await (await page.drawerButton()).opened();
  assert.equal(actual, false);
});
