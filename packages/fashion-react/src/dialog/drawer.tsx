import { IZComponentHierarchy, ZDialogDrawerElement } from '@zthun/fashion-boutique';
import { ZSideAnchor, cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';
import { IZDialogProps } from './use-dialog';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-dialog-drawer']: ZDialogDrawerElement & any;
    }
  }
}

export interface IZDrawer extends IZComponentHierarchy<ReactNode>, IZComponentStyle, IZDialogProps {
  anchor?: ZSideAnchor;
}

export function ZDrawer(props: IZDrawer) {
  const { className, children, anchor, onClose, open } = props;
  const drawer = useRef<ZDialogDrawerElement>(null);
  useWebComponent(ZDialogDrawerElement);

  const onClosed = useCallback(() => onClose?.call(null), [onClose]);

  useEffect(() => {
    drawer.current?.removeEventListener('close', onClosed);
    drawer.current?.addEventListener('close', onClosed);

    return () => {
      drawer.current?.removeEventListener('close', onClosed);
    };
  }, [drawer.current, onClosed]);

  useEffect(() => {
    if (open) {
      drawer.current?.open?.call(drawer.current);
    } else {
      drawer.current?.close?.call(drawer.current);
    }
  }, [drawer.current, open]);

  return (
    <z-dialog-drawer class={cssJoinDefined(className)} ref={drawer} anchor={anchor}>
      {children}
    </z-dialog-drawer>
  );
}
