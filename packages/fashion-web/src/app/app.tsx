import {
  IZBreadcrumbsLocation,
  ZBannerMain,
  ZBreadcrumbsOutlet,
  ZButton,
  ZCaption,
  ZFashionThemeContext,
  ZH1,
  ZIconFontAwesome,
  ZImageSource,
  ZNotFound,
  ZRoute,
  ZRouteMap,
  ZRouter
} from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { createDarkTheme, createLightTheme } from '@zthun/fashion-theme';
import React, { useMemo, useState } from 'react';
import { ZAlertPage } from '../boutique/alert/alert-page';
import { ZBooleanPage } from '../boutique/boolean/boolean-page';
import { ZBoutiquePage } from '../boutique/boutique-page';
import { ZBubblePage } from '../boutique/bubble/bubble-page';
import { ZButtonPage } from '../boutique/button/button-page';
import { ZCardPage } from '../boutique/card/card-page';
import { ZCarouselPage } from '../boutique/carousel/carousel-page';
import { ZChartPage } from '../boutique/chart/chart-page';
import { ZChoicePage } from '../boutique/choice/choice-page';
import { ZDrawerPage } from '../boutique/drawer/drawer-page';
import { ZGridViewPage } from '../boutique/grid-view/grid-view-page';
import { ZImagePage } from '../boutique/image/image-page';
import { ZListPage } from '../boutique/list/list-page';
import { ZModalPage } from '../boutique/modal/modal-page';
import { ZNumberPage } from '../boutique/number/number-page';
import { ZPopupPage } from '../boutique/popup/popup-page';
import { ZSuspensePage } from '../boutique/suspense/suspense-page';
import { ZTextPage } from '../boutique/text/text-page';
import { ZTypographyPage } from '../boutique/typography/typography-page';
import { ZYouTubePage } from '../boutique/you-tube/you-tube-page';
import { ZHomePage } from '../home/home-page';
import {
  ZFashionRouteAlert,
  ZFashionRouteBoolean,
  ZFashionRouteBoutique,
  ZFashionRouteBubble,
  ZFashionRouteButton,
  ZFashionRouteCard,
  ZFashionRouteCarousel,
  ZFashionRouteChart,
  ZFashionRouteChoice,
  ZFashionRouteDrawer,
  ZFashionRouteGridView,
  ZFashionRouteHome,
  ZFashionRouteImage,
  ZFashionRouteList,
  ZFashionRouteModal,
  ZFashionRouteNumber,
  ZFashionRoutePopup,
  ZFashionRouteSuspense,
  ZFashionRouteText,
  ZFashionRouteTheme,
  ZFashionRouteTypography,
  ZFashionRouteYouTube
} from '../routes';
import { ZThemePage } from '../theme/theme-page';

const lightTheme = createLightTheme();
const darkTheme = createDarkTheme();

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the fashion web application.
 */
export function ZFashionApp() {
  const avatar = <ZImageSource src={ZFashionRouteHome.avatar} height={ZSizeVaried.Full} />;
  const [theme, setTheme] = useState(darkTheme);
  const { dark, light } = theme;
  const prefix = (
    <div className='ZFashionApp-description'>
      <ZH1 compact>{ZFashionRouteHome.name}</ZH1>
      <ZCaption compact>{ZFashionRouteHome.description}</ZCaption>
    </div>
  );

  const breadcrumbs: IZBreadcrumbsLocation = useMemo(() => ({ home: { name: 'home' } }), []);

  const toggleTheme = () => {
    setTheme((t) => (t === lightTheme ? darkTheme : lightTheme));
  };

  const suffix = (
    <ZButton
      label={<ZIconFontAwesome name='lightbulb' width={ZSizeFixed.ExtraSmall} />}
      onClick={toggleTheme}
      fashion={theme === lightTheme ? dark : light}
      tooltip={theme === lightTheme ? 'Switch to dark theme' : 'Switch to light theme'}
    />
  );

  return (
    <ZRouter>
      <ZFashionThemeContext.Provider value={theme}>
        <ZBannerMain avatar={avatar} prefix={prefix} suffix={suffix}>
          <ZRouteMap>
            <ZRoute path={ZFashionRouteHome.path} element={<ZHomePage />} />
            <ZRoute path={ZFashionRouteTheme.path} element={<ZBreadcrumbsOutlet breadcrumbsProps={breadcrumbs} />}>
              <ZRoute path='' element={<ZThemePage />} />
            </ZRoute>
            <ZRoute path={ZFashionRouteBoutique.path} element={<ZBreadcrumbsOutlet breadcrumbsProps={breadcrumbs} />}>
              <ZRoute path={ZFashionRouteAlert.path} element={<ZAlertPage />} />
              <ZRoute path={ZFashionRouteBoolean.path} element={<ZBooleanPage />} />
              <ZRoute path={ZFashionRouteBubble.path} element={<ZBubblePage />} />
              <ZRoute path={ZFashionRouteButton.path} element={<ZButtonPage />} />
              <ZRoute path={ZFashionRouteCard.path} element={<ZCardPage />} />
              <ZRoute path={ZFashionRouteCarousel.path} element={<ZCarouselPage />} />
              <ZRoute path={ZFashionRouteChart.path} element={<ZChartPage />} />
              <ZRoute path={ZFashionRouteChoice.path} element={<ZChoicePage />} />
              <ZRoute path={ZFashionRouteDrawer.path} element={<ZDrawerPage />} />
              <ZRoute path={ZFashionRouteGridView.path} element={<ZGridViewPage />} />
              <ZRoute path={ZFashionRouteImage.path} element={<ZImagePage />} />
              <ZRoute path={ZFashionRouteList.path} element={<ZListPage />} />
              <ZRoute path={ZFashionRouteModal.path} element={<ZModalPage />} />
              <ZRoute path={ZFashionRouteNumber.path} element={<ZNumberPage />} />
              <ZRoute path={ZFashionRoutePopup.path} element={<ZPopupPage />} />
              <ZRoute path={ZFashionRouteSuspense.path} element={<ZSuspensePage />} />
              <ZRoute path={ZFashionRouteText.path} element={<ZTextPage />} />
              <ZRoute path={ZFashionRouteTypography.path} element={<ZTypographyPage />} />
              <ZRoute path={ZFashionRouteYouTube.path} element={<ZYouTubePage />} />
              <ZRoute path='' element={<ZBoutiquePage />} />
            </ZRoute>
            <ZRoute path='*' element={<ZNotFound />} />
          </ZRouteMap>
        </ZBannerMain>
      </ZFashionThemeContext.Provider>
    </ZRouter>
  );
}
