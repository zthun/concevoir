import { When } from '@cucumber/cucumber';
import { ZFashionRouteVenue, ZFashionRouteVenueTypography } from '../../src/routes';
import { ZTypographyPageComponentModel } from '../../src/venue/typography/typography-page.cm';
import { ZFashionWorld } from '../fashion-world';

When('I navigate to the typography demo page', async function (this: ZFashionWorld<ZTypographyPageComponentModel>) {
  await this.open(ZFashionRouteVenue, ZFashionRouteVenueTypography);
  this.parameters.page = await this.create(ZTypographyPageComponentModel);
});
