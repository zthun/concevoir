import {
  IZBreadcrumbsLocation,
  ZBox,
  ZBreadcrumbOutlet,
  ZCaption,
  ZChoiceToggle,
  ZDrawerButton,
  ZFashionThemeContext,
  ZH1,
  ZH6,
  ZImageSource,
  ZNotFound,
  ZRoute,
  ZRouteMap,
  ZRouter
} from '@zthun/fashion-boutique';
import { ZBannerMain } from '@zthun/fashion-boutique-page';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { createTheme as createLightTheme } from '@zthun/fashion-theme';
import { createTheme as createDarkTheme } from '@zthun/fashion-theme-dark';
import { ZHorizontalAnchor, setFirst } from '@zthun/helpful-fn';
import { identity } from 'lodash';
import React, { useMemo, useState } from 'react';
import { ZBooleanPage } from '../boutique/boolean/boolean-page';
import { ZBoutiquePage } from '../boutique/boutique-page';
import { ZButtonPage } from '../boutique/button/button-page';
import { ZCardPage } from '../boutique/card/card-page';
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
  ZFashionRouteCard,
  ZFashionRouteChoice,
  ZFashionRouteDrawer,
  ZFashionRouteHome,
  ZFashionRouteList,
  ZFashionRouteNumber,
  ZFashionRouteSuspense,
  ZFashionRouteText,
  ZFashionRouteTheme,
  ZFashionRouteTypography
} from '../routes';
import { ZThemePage } from '../theme/theme-page';

const lightTheme = { theme: createLightTheme(), avatar: 'images/svg/light.svg' };
const darkTheme = { theme: createDarkTheme(), avatar: 'images/svg/dark.svg' };
const themes = [lightTheme, darkTheme];

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the fashion web application.
 */
export function ZFashionApp() {
  const avatar = <ZImageSource src={ZFashionRouteHome.avatar} height={ZSizeVaried.Full} />;
  const [theme, setTheme] = useState(lightTheme);
  const _setTheme = setFirst.bind(null, setTheme, lightTheme);
  const prefix = (
    <div className='ZFashionApp-description'>
      <ZH1 compact>{ZFashionRouteHome.name}</ZH1>
      <ZCaption compact>{ZFashionRouteHome.description}</ZCaption>
    </div>
  );

  const breadcrumbs: IZBreadcrumbsLocation = useMemo(() => ({ home: { name: 'home' } }), []);

  const suffix = (
    <ZDrawerButton DrawerProps={{ anchor: ZHorizontalAnchor.Right }}>
      <ZBox padding={ZSizeFixed.Medium}>
        <ZH6>Options</ZH6>
        <ZChoiceToggle
          label='Theme'
          indelible
          value={[theme]}
          onValueChange={_setTheme}
          options={themes}
          renderOption={(o) => o.theme.name}
          display={(t) => t.theme.name}
          identifier={identity}
        />
      </ZBox>
    </ZDrawerButton>
  );

  return (
    <ZRouter>
      <ZFashionThemeContext.Provider value={theme.theme}>
        <ZBannerMain avatar={avatar} prefix={prefix} suffix={suffix}>
          <ZRouteMap>
            <ZRoute path={ZFashionRouteHome.path} element={<ZHomePage />} />
            <ZRoute path={ZFashionRouteTheme.path} element={<ZBreadcrumbOutlet breadcrumbsProps={breadcrumbs} />}>
              <ZRoute path='' element={<ZThemePage />} />
            </ZRoute>
            <ZRoute path={ZFashionRouteBoutique.path} element={<ZBreadcrumbOutlet breadcrumbsProps={breadcrumbs} />}>
              <ZRoute path={ZFashionRouteBoolean.path} element={<ZBooleanPage />} />
              <ZRoute path={ZFashionRouteButton.path} element={<ZButtonPage />} />
              <ZRoute path={ZFashionRouteCard.path} element={<ZCardPage />} />
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
      </ZFashionThemeContext.Provider>
    </ZRouter>
  );
}
