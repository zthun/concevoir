// cspell:disable
import { ZCard, ZH3, ZIconFontAwesome, ZParagraph } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React from 'react';
import { ZFashionRouteYouTube } from '../../routes';

/**
 * Represents a demo for typography.
 *
 * @returns The JSX to render the typography demo page.
 */
export function ZYouTubePage() {
  return (
    <ZCard
      className='ZYouTubePage-root'
      heading={ZFashionRouteYouTube.name}
      subHeading={ZFashionRouteYouTube.description}
      avatar={
        <ZIconFontAwesome
          name={ZFashionRouteYouTube.avatar}
          family={ZFashionRouteYouTube.family}
          width={ZSizeFixed.Medium}
        />
      }
    >
      <ZH3>Description</ZH3>

      <ZParagraph>Embed YouTube videos into your site.</ZParagraph>
    </ZCard>
  );
}
