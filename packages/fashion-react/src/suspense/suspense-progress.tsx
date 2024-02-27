import { ZDeviceElement, ZSuspenseProgressElement } from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { useEffect, useMemo } from 'react';
import { IZSuspense } from './suspense.mjs';

import '../background/device';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-suspense-progress']: ZSuspenseProgressElement & any;
    }
  }
}

/**
 * Renders a line bar suspense.
 *
 * @param props -
 *        The properties for the component.
 *
 * @returns The jsx for the component.
 */
export function ZSuspenseProgress(props: IZSuspense<ZSizeVaried.Full, ZSizeFixed>) {
  const { className, loading = true, height, name, fashion } = props;

  const $height = useMemo(() => new ZDeviceBounds(height, ZSizeFixed.ExtraSmall).toDeviceMap(), [height]);

  useEffect(() => ZSuspenseProgressElement.register(), []);
  useEffect(() => ZDeviceElement.register(), []);

  return (
    <z-suspense-progress className={cssJoinDefined(className)} loading={loading} fashion={fashion} name={name}>
      <z-device xl={$height.xl} lg={$height.lg} md={$height.md} sm={$height.sm} xs={$height.xs} name='height' />
    </z-suspense-progress>
  );
}
