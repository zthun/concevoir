import { Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZTypographyPageComponentModel } from '../../src/boutique/typography/typography-page.cm';
import { ZFashionRouteBoutique, ZFashionRouteTypography } from '../../src/routes';
import { ZFashionWorld } from '../fashion-world';

When('I navigate to the typography demo page', async function (this: ZFashionWorld<ZTypographyPageComponentModel>) {
  await this.open(ZFashionRouteBoutique, ZFashionRouteTypography);
  this.parameters.page = await this.create(ZTypographyPageComponentModel);
});

When(
  'I select the {string} fashion option on the typography page',
  async function (this: ZFashionWorld<ZTypographyPageComponentModel>, name: string) {
    const fashion = await this.parameters.page.fashion();
    await fashion.select(name);
  }
);

Then(
  'the typography fashion should be {string} on the typography page',
  async function (this: ZFashionWorld<ZTypographyPageComponentModel>, name: string) {
    const color = await this.parameters.page.color();
    const actual = await color.fashion();
    assert.equal(name, actual);
  }
);
