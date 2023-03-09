import { ZCaption, ZH1, ZImageSource, ZRoute, ZRouteMap, ZRouter } from '@zthun/fashion-boutique';
import { ZBannerMain, ZBreadcrumbOutlet, ZNotFound } from '@zthun/fashion-boutique-page';
import { ZSizeVaried } from '@zthun/fashion-tailor';
import React from 'react';
import { ZBooleanPage } from '../boutique/boolean/boolean-page';
import { ZBoutiquePage } from '../boutique/boutique-page';
import { ZButtonPage } from '../boutique/button/button-page';
import { ZChoicePage } from '../boutique/choice/choice-page';
import { ZDrawerPage } from '../boutique/drawer/drawer-page';
import { ZListPage } from '../boutique/list/list-page';
import { ZNumberPage } from '../boutique/number/number-page';
import { ZSuspensePage } from '../boutique/suspense/suspense-page';
import { ZTextPage } from '../boutique/text/text-page';
import { ZTypographyPage } from '../boutique/typography/typography-page';
import { ZHomePage } from '../home/home-page';
import {
  ZFashionRouteBoolean,
  ZFashionRouteBoutique,
  ZFashionRouteButton,
  ZFashionRouteChoice,
  ZFashionRouteDrawer,
  ZFashionRouteHome,
  ZFashionRouteList,
  ZFashionRouteNumber,
  ZFashionRouteSuspense,
  ZFashionRouteText,
  ZFashionRouteTypography
} from '../routes';

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the fashion web application.
 */
export function ZFashionApp() {
  const avatar = <ZImageSource src='/images/svg/fashion.svg' height={ZSizeVaried.Full} />;
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
          <ZRoute path={ZFashionRouteBoutique.path} element={<ZBreadcrumbOutlet />}>
            <ZRoute path={ZFashionRouteBoolean.path} element={<ZBooleanPage />} />
            <ZRoute path={ZFashionRouteButton.path} element={<ZButtonPage />} />
            <ZRoute path={ZFashionRouteChoice.path} element={<ZChoicePage />} />
            <ZRoute path={ZFashionRouteDrawer.path} element={<ZDrawerPage />} />
            <ZRoute path={ZFashionRouteList.path} element={<ZListPage />} />
            <ZRoute path={ZFashionRouteNumber.path} element={<ZNumberPage />} />
            <ZRoute path={ZFashionRouteSuspense.path} element={<ZSuspensePage />} />
            <ZRoute path={ZFashionRouteText.path} element={<ZTextPage />} />
            <ZRoute path={ZFashionRouteTypography.path} element={<ZTypographyPage />} />
            <ZRoute path='' element={<ZBoutiquePage />} />
          </ZRoute>
          <ZRoute path='*' element={<ZNotFound />} />
        </ZRouteMap>
      </ZBannerMain>
    </ZRouter>
  );
}
