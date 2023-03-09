import { When } from '@cucumber/cucumber';
import { ZTypographyPageComponentModel } from '../../src/boutique/typography/typography-page.cm';
import { ZFashionRouteVenue, ZFashionRouteVenueTypography } from '../../src/routes';
import { ZFashionWorld } from '../fashion-world';

When('I navigate to the typography demo page', async function (this: ZFashionWorld<ZTypographyPageComponentModel>) {
  await this.open(ZFashionRouteVenue, ZFashionRouteVenueTypography);
  this.parameters.page = await this.create(ZTypographyPageComponentModel);
});
