import { IZComponentFashion, IZComponentHeight, ZBannerElement, ZDeviceElement } from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { useEffect, useMemo } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

import '../background/device';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-banner']: ZBannerElement & any;
    }
  }
}

export interface IZBanner
  extends IZComponentHierarchy,
    IZComponentFashion,
    Pick<IZComponentHeight<ZSizeFixed | ZSizeVaried.Fit>, 'height'>,
    IZComponentStyle {}

export function ZBanner(props: IZBanner) {
  const { children, className, fashion, height } = props;
  const $height = useMemo(() => new ZDeviceBounds(height, ZSizeVaried.Fit).toDeviceMap(), [height]);

  useEffect(() => ZBannerElement.register(), []);
  useEffect(() => ZDeviceElement.register(), []);

  return (
    <z-banner class={cssJoinDefined(className)} fashion={fashion}>
      <z-device xl={$height.xl} lg={$height.lg} md={$height.md} sm={$height.sm} xs={$height.xs} name='height' />
      {children}
    </z-banner>
  );
}
