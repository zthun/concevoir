import { When } from '@cucumber/cucumber';
import { ZFashionVenueTypographyPageComponentModel } from '../../src/fashion-venue/typography/fashion-venue-typography-page.cm';
import { ZFashionRouteVenue, ZFashionRouteVenueTypography } from '../../src/routes';
import { ZFashionWorld } from '../fashion-world';

When(
  'I navigate to the typography demo page',
  async function (this: ZFashionWorld<ZFashionVenueTypographyPageComponentModel>) {
    await this.open(ZFashionRouteVenue, ZFashionRouteVenueTypography);
    this.parameters.page = await this.create(ZFashionVenueTypographyPageComponentModel);
  }
);
