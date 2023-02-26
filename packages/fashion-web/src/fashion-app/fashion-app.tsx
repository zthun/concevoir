import { ZSizeVaried } from '@zthun/fashion-designer';
import { ZRunwayHeaderMain } from '@zthun/fashion-runway';
import { ZCaption, ZH1, ZImageSource, ZRoute, ZRouteMapApp, ZRouter } from '@zthun/fashion-venue';
import React from 'react';
import { ZFashionHome } from '../fashion-home/fashion-home';

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
      <ZCaption compact>Make it look good</ZCaption>
    </div>
  );
  return (
    <ZRouter>
      <ZRunwayHeaderMain avatar={avatar} prefix={prefix}>
        <ZRouteMapApp>
          <ZRoute path='/' element={<ZFashionHome />} />
        </ZRouteMapApp>
      </ZRunwayHeaderMain>
    </ZRouter>
  );
}
