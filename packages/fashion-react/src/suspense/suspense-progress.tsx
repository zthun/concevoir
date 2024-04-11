import { ZDeviceElement, ZSuspenseProgressElement } from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { useMemo } from 'react';
import { useWebComponent } from '../component/use-web-component.mjs';
import { IZSuspense } from './suspense.mjs';

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
 * @returns
 *        The jsx for the component.
 */
export function ZSuspenseProgress(props: IZSuspense<ZSizeVaried.Full, ZSizeFixed>) {
  const { className, loading = true, height, name, fashion } = props;

  const $height = useMemo(() => new ZDeviceBounds(height, ZSizeFixed.ExtraSmall).toDeviceMap(), [height]);
  useWebComponent(ZSuspenseProgressElement);
  useWebComponent(ZDeviceElement);

  return (
    <z-suspense-progress className={cssJoinDefined(className)} disabled={!loading} fashion={fashion} name={name}>
      <z-device xl={$height.xl} lg={$height.lg} md={$height.md} sm={$height.sm} xs={$height.xs} name='height' />
    </z-suspense-progress>
  );
}
