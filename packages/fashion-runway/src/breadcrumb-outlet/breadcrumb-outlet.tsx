import { ZSizeFixed } from '@zthun/fashion-designer';
import { IZComponentName, IZComponentStyle, ZBox, ZBreadcrumbsLocation, ZOutlet } from '@zthun/fashion-venue';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';

/**
 * The properties for the breadcrumb outlet.
 */
export interface IZBreadcrumbOutlet extends IZComponentStyle, IZComponentName {}

/**
 * Represents a layout where breadcrumbs are displayed on top of the current router outlet.
 */
export function ZBreadcrumbOutlet(props: IZBreadcrumbOutlet) {
  const { className, name } = props;

  return (
    <div className={cssJoinDefined('ZBreadcrumbOutlet-root', className)} data-name={name}>
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZBreadcrumbsLocation name='outlet-breadcrumbs' />
      </ZBox>
      <ZOutlet />
    </div>
  );
}
