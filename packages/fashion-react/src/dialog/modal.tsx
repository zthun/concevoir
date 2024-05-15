import {
  IZComponentFashion,
  IZComponentHeight,
  IZComponentHierarchy,
  IZComponentName,
  IZComponentWidth,
  ZModalElement
} from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstTruthy } from '@zthun/helpful-fn';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';
import { IZDialogProps } from './use-dialog';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-modal']: ZModalElement & any;
    }
  }
}

export interface IZModal
  extends IZComponentHierarchy<ReactNode>,
    IZComponentName,
    IZDialogProps,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentWidth<ZSizeFixed | ZSizeVaried>,
    IZComponentHeight<ZSizeFixed | ZSizeVaried> {
  persistent?: boolean;

  renderHeader?(): ReactNode;
  renderFooter?(): ReactNode;
}

export function ZModal(props: IZModal) {
  const { children, className, name, fashion, open, renderHeader, renderFooter, onClose, persistent, width, height } =
    props;
  const modal = useRef<ZModalElement>(null);
  const { xl: wXl, lg: wLg, md: wMd, sm: wSm, xs: wXs } = new ZDeviceBounds(width, ZSizeVaried.Fit).toDeviceMap();
  const { xl: hXl, lg: hLg, md: hMd, sm: hSm, xs: hXs } = new ZDeviceBounds(height, ZSizeVaried.Fit).toDeviceMap();

  useWebComponent(ZModalElement);

  const onClosed = useCallback(() => {
    onClose?.call(null);
  }, [onClose]);

  useEffect(() => {
    modal.current?.removeEventListener('cancel', onClosed);
    modal.current?.addEventListener('cancel', onClosed);
    modal.current?.removeEventListener('close', onClosed);
    modal.current?.addEventListener('close', onClosed);

    return () => {
      modal.current?.removeEventListener('cancel', onClosed);
      modal.current?.removeEventListener('close', onClosed);
    };
  }, [modal.current]);

  useEffect(() => {
    if (open) {
      modal.current?.open?.call(modal.current);
    } else {
      modal.current?.close?.call(modal.current);
    }
  }, [modal.current, open]);

  return (
    <z-modal
      class={cssJoinDefined(className)}
      fashion={fashion}
      name={name}
      persistent={firstTruthy(undefined, persistent)}
      ref={modal}
      fade={1000}
    >
      <z-device name='width' xl={wXl} lg={wLg} md={wMd} sm={wSm} xs={wXs} />
      <z-device name='height' xl={hXl} lg={hLg} md={hMd} sm={hSm} xs={hXs} />
      <div slot='header'>{renderHeader?.call(null)}</div>
      {children}
      {<div slot='footer'>{renderFooter?.call(null)}</div>}
    </z-modal>
  );
}
