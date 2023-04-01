import {
  IZBreadcrumbsLocation,
  IZComponentName,
  IZComponentStyle,
  ZBox,
  ZBreadcrumbsLocation,
  ZOutlet
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';

/**
 * The properties for the breadcrumb outlet.
 */
export interface IZBreadcrumbOutlet extends IZComponentStyle, IZComponentName {
  /**
   * The properties for the underlying breadcrumb location component.
   */
  breadcrumbsProps?: Omit<IZBreadcrumbsLocation, 'name'>;
}

/**
 * Represents a layout where breadcrumbs are displayed on top of the current router outlet.
 */
export function ZBreadcrumbOutlet(props: IZBreadcrumbOutlet) {
  const { className, name, breadcrumbsProps } = props;

  return (
    <div className={cssJoinDefined('ZBreadcrumbOutlet-root', className)} data-name={name}>
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZBreadcrumbsLocation {...breadcrumbsProps} name='outlet-breadcrumbs' />
      </ZBox>
      <ZOutlet />
    </div>
  );
}
