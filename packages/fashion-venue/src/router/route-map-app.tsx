import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { ZStatusCodePage } from '../page/status-code-page';
import { ZNavigate, ZRoute, ZRouteMap } from './router-dom';

export interface IZRouteMapApp extends IZComponentHierarchy {
  home?: string;
}

/**
 * Represents a component route map that contains default routes for not found pages.
 *
 * @param props -
 *        The properties for the component.
 *
 * @returns
 *        The jsx that renders the component.
 */
export function ZRouteMapApp(props: IZRouteMapApp) {
  const { home = '/', children } = props;

  return (
    <ZRouteMap>
      {children}
      <ZRoute path='/status-code/:code' element={<ZStatusCodePage name='code' />} />
      <ZRoute path='/' element={<ZNavigate to={home} />} />
      <ZRoute path='*' element={<ZNavigate to={'/status-code/404'} />} />
    </ZRouteMap>
  );
}
