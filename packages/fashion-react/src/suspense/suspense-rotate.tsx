import { ZSuspenseRotateElement } from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { useEffect, useMemo } from 'react';
import { IZSuspense } from './suspense.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-suspense-rotate']: ZSuspenseRotateElement & any;
    }
  }
}

export function ZSuspenseRotate(props: IZSuspense) {
  const { className, loading, name, width, fashion } = props;

  const $width = useMemo(() => new ZDeviceBounds(width, ZSizeFixed.ExtraSmall).toDeviceMap(), [width]);

  useEffect(() => ZSuspenseRotateElement.register(), []);

  return (
    <z-suspense-rotate class={cssJoinDefined(className)} fashion={fashion} loading={loading} name={name}>
      <z-device xl={$width.xl} lg={$width.lg} md={$width.md} sm={$width.sm} xs={$width.xs} name='width' />
    </z-suspense-rotate>
  );
}
