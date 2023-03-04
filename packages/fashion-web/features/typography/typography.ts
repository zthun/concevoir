import { When } from '@cucumber/cucumber';
import { ZFashionRouteVenue, ZFashionRouteVenueTypography } from '../../src/routes';
import { ZFashionVenueTypographyPageComponentModel } from '../../src/venue/typography/fashion-venue-typography-page.cm';
import { ZFashionWorld } from '../fashion-world';

When(
  'I navigate to the typography demo page',
  async function (this: ZFashionWorld<ZFashionVenueTypographyPageComponentModel>) {
    await this.open(ZFashionRouteVenue, ZFashionRouteVenueTypography);
    this.parameters.page = await this.create(ZFashionVenueTypographyPageComponentModel);
  }
);
