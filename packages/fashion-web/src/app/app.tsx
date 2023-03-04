import { ZSizeVaried } from '@zthun/fashion-designer';
import { ZBannerMain, ZBreadcrumbOutlet, ZNotFound } from '@zthun/fashion-runway';
import { ZCaption, ZH1, ZImageSource, ZRoute, ZRouteMap, ZRouter } from '@zthun/fashion-venue';
import React from 'react';
import { ZHomePage } from '../home/home-page';
import {
  ZFashionRouteHome,
  ZFashionRouteVenue,
  ZFashionRouteVenueBoolean,
  ZFashionRouteVenueButton,
  ZFashionRouteVenueTypography
} from '../routes';
import { ZBooleanPage } from '../venue/boolean/boolean-page';
import { ZButtonPage } from '../venue/button/button-page';
import { ZFashionVenueTypographyPage } from '../venue/typography/typography-page';
import { ZFashionVenuePage } from '../venue/venue-page';

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the fashion web application.
 */
export function ZFashionApp() {
  const avatar = <ZImageSource src='images/svg/fashion.svg' height={ZSizeVaried.Full} />;
  const prefix = (
    <div className='ZFashionApp-description'>
      <ZH1 compact>Fashion</ZH1>
      <ZCaption compact>Build Something Pretty</ZCaption>
    </div>
  );

  return (
    <ZRouter>
      <ZBannerMain avatar={avatar} prefix={prefix}>
        <ZRouteMap>
          <ZRoute path={ZFashionRouteHome.path} element={<ZHomePage />} />
          <ZRoute path={ZFashionRouteVenue.path} element={<ZBreadcrumbOutlet />}>
            <ZRoute path={ZFashionRouteVenueBoolean.path} element={<ZBooleanPage />} />
            <ZRoute path={ZFashionRouteVenueButton.path} element={<ZButtonPage />} />
            <ZRoute path={ZFashionRouteVenueTypography.path} element={<ZFashionVenueTypographyPage />} />
            <ZRoute path='' element={<ZFashionVenuePage />} />
          </ZRoute>
          <ZRoute path='*' element={<ZNotFound />} />
        </ZRouteMap>
      </ZBannerMain>
    </ZRouter>
  );
}
