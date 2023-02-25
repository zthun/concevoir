import { ZRunwayHeaderMain } from '@zthun/fashion-runway';
import { ZCaption, ZH1 } from '@zthun/fashion-venue';
import React from 'react';

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the fashion web application.
 */
export function ZFashionApp() {
  const avatar = <img src='images/svg/fashion.svg' />;
  const prefix = (
    <div className='ZFashionApp-description'>
      <ZH1 compact>Fashion</ZH1>
      <ZCaption compact>Welcome to the show</ZCaption>
    </div>
  );
  return (
    <ZRunwayHeaderMain avatar={avatar} prefix={prefix}>
      Content Here!
    </ZRunwayHeaderMain>
  );
}
