import { ZBox, ZCard, ZChoiceDropDown, ZGrid, ZH3, ZImageSource, ZParagraph } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionThemeBuilder } from '@zthun/fashion-theme';
import { setFirst } from '@zthun/helpful-fn';
import { identity } from 'lodash';
import React, { useState } from 'react';
import { ZFashionRouteTheme } from '../routes';
import { ZFashionColors } from './color/fashion-colors';

const themeDefault = new ZFashionThemeBuilder().build();

/**
 * Represents the theme page.
 *
 * @returns The JSX to render the theme page.
 */
export function ZThemePage() {
  const [theme, setTheme] = useState(themeDefault);
  const themes = [themeDefault];
  const _setTheme = setFirst.bind(null, setTheme, themeDefault);

  return (
    <ZCard
      className='ZThemePage-root'
      heading={ZFashionRouteTheme.name}
      subHeading={ZFashionRouteTheme.description}
      avatar={<ZImageSource src={ZFashionRouteTheme.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          A fashion theme describes the different makeup of page colors that are used across common places in a website.
        </ZParagraph>

        <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
          <ZGrid columns='1fr 1fr 1fr' columnsLg='1fr 1fr' columnsMd='1fr' gap={ZSizeFixed.Medium}>
            <ZFashionColors fashion={theme.primary} />
            <ZFashionColors fashion={theme.secondary} />
            <ZFashionColors fashion={theme.success} />
            <ZFashionColors fashion={theme.warning} />
            <ZFashionColors fashion={theme.error} />
            <ZFashionColors fashion={theme.info} />
            <ZFashionColors fashion={theme.light} />
            <ZFashionColors fashion={theme.dark} />
            <ZFashionColors fashion={theme.body} />
            <ZFashionColors fashion={theme.surface} />
          </ZGrid>
        </ZBox>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGrid gap={ZSizeFixed.Medium}>
          <ZChoiceDropDown
            indelible
            options={themes}
            value={[theme]}
            onValueChange={_setTheme}
            identifier={identity}
            renderOption={(t) => t.name}
          />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
