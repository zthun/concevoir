import { IZComponentHeight, IZComponentWidth, ZDialogModalElement } from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstTruthy } from '@zthun/helpful-fn';
import React, { useRef } from 'react';
import { useWebComponent } from '../component/use-web-component.mjs';
import { IZDialog, useDialog } from './use-dialog';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-dialog-modal']: ZDialogModalElement & any;
    }
  }
}

export interface IZModal
  extends IZDialog,
    IZComponentWidth<ZSizeFixed | ZSizeVaried>,
    IZComponentHeight<ZSizeFixed | ZSizeVaried> {}

export function ZModal(props: IZModal) {
  const { children, className, name, fashion, renderHeader, renderFooter, persistent, width, height } = props;
  const modal = useRef<ZDialogModalElement>(null);
  const { xl: wXl, lg: wLg, md: wMd, sm: wSm, xs: wXs } = new ZDeviceBounds(width, ZSizeVaried.Fit).toDeviceMap();
  const { xl: hXl, lg: hLg, md: hMd, sm: hSm, xs: hXs } = new ZDeviceBounds(height, ZSizeVaried.Fit).toDeviceMap();

  useWebComponent(ZDialogModalElement);
  useDialog(modal.current, props);

  return (
    <z-dialog-modal
      class={cssJoinDefined(className)}
      fashion={fashion}
      name={name}
      persistent={firstTruthy(undefined, persistent)}
      ref={modal}
    >
      <z-device name='width' xl={wXl} lg={wLg} md={wMd} sm={wSm} xs={wXs} />
      <z-device name='height' xl={hXl} lg={hLg} md={hMd} sm={hSm} xs={hXs} />
      <div slot='header'>{renderHeader?.call(null)}</div>
      {children}
      {<div slot='footer'>{renderFooter?.call(null)}</div>}
    </z-dialog-modal>
  );
}
