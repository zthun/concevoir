import { When } from '@cucumber/cucumber';
import { ZTypographyPageComponentModel } from '../../src/boutique/typography/typography-page.cm';
import { ZFashionRouteBoutique, ZFashionRouteTypography } from '../../src/routes';
import { ZFashionWorld } from '../fashion-world';

When('I navigate to the typography demo page', async function (this: ZFashionWorld<ZTypographyPageComponentModel>) {
  await this.open(ZFashionRouteBoutique, ZFashionRouteTypography);
  this.parameters.page = await this.create(ZTypographyPageComponentModel);
});
