import { ZBox, ZCard, ZH3, ZH4, ZIconFontAwesome, ZParagraph, ZStack } from '@zthun/fashion-react';
import { ZGapSize, ZSizeFixed, ZSizeVoid } from '@zthun/fashion-tailor';
import { ZFashionArea, ZFashionContrast, ZFashionName, ZFashionPriority, ZFashionSeverity } from '@zthun/fashion-theme';
import { ZOrientation, ZQuadrilateralBuilder } from '@zthun/helpful-fn';
import { noop, startCase } from 'lodash-es';
import React from 'react';
import { ZFashionRouteTheme } from '../routes.mjs';

/**
 * Represents the theme page.
 *
 * @returns The JSX to render the theme page.
 */
export function ZThemePage() {
  const padding = new ZQuadrilateralBuilder(ZSizeFixed.Large).build();
  const margin = new ZQuadrilateralBuilder<ZGapSize>(ZSizeVoid.None).bottom(ZSizeFixed.Medium).build();
  const edge = new ZQuadrilateralBuilder(ZSizeFixed.Large).build();
  const trim = new ZQuadrilateralBuilder('solid').build();

  const renderFashion = (fashion: ZFashionName) => (
    <ZBox padding={padding} edge={edge} trim={trim} fashion={fashion} margin={margin} onClick={noop}>
      <ZStack orientation={ZOrientation.Horizontal} justifyContent='center'>
        <ZH4 compact>{startCase(fashion)}</ZH4>
      </ZStack>
    </ZBox>
  );

  return (
    <ZCard
      className='ZThemePage-root'
      heading={ZFashionRouteTheme.name}
      subHeading={ZFashionRouteTheme.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteTheme.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          A fashion theme describes the different makeup of page colors that are used across common places in a website.
        </ZParagraph>

        <ZH3>Priority</ZH3>
        {renderFashion(ZFashionPriority.Primary)}
        {renderFashion(ZFashionPriority.Secondary)}

        <ZH3>Severity</ZH3>
        {renderFashion(ZFashionSeverity.Success)}
        {renderFashion(ZFashionSeverity.Warning)}
        {renderFashion(ZFashionSeverity.Error)}
        {renderFashion(ZFashionSeverity.Info)}

        <ZH3>Contrast</ZH3>
        {renderFashion(ZFashionContrast.Dark)}
        {renderFashion(ZFashionContrast.Light)}
        {renderFashion(ZFashionContrast.Opposite)}

        <ZH3>Area</ZH3>
        {renderFashion(ZFashionArea.Body)}
        {renderFashion(ZFashionArea.Component)}
        {renderFashion(ZFashionArea.Surface)}
      </ZBox>
    </ZCard>
  );
}
