import { Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZDrawerPageComponentModel } from '../../src/boutique/drawer/drawer-page.cm';
import { ZFashionRouteBoutique, ZFashionRouteDrawer } from '../../src/routes';
import { ZFashionWorld } from '../fashion-world';

When('I navigate to the drawer demo page', async function (this: ZFashionWorld<ZDrawerPageComponentModel>) {
  await this.open(ZFashionRouteBoutique, ZFashionRouteDrawer);
  this.parameters.page = await this.create(ZDrawerPageComponentModel);
});

When(
  'I anchor the drawer to the {string} on the drawer demo page',
  async function (this: ZFashionWorld<ZDrawerPageComponentModel>, anchor: 'left' | 'right' | 'top' | 'bottom') {
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
  async function (this: ZFashionWorld<ZDrawerPageComponentModel>, anchor: 'left' | 'right' | 'top' | 'bottom') {
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
