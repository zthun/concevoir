import { IZComponentHierarchy, ZDrawerElement } from '@zthun/fashion-boutique';
import { ZSideAnchor, cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';
import { IZDialogProps } from './use-dialog';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-drawer']: ZDrawerElement & any;
    }
  }
}

/**
 * Represents props for the drawer.
 */
export interface IZDrawer extends IZComponentHierarchy<ReactNode>, IZComponentStyle, IZDialogProps {
  anchor?: ZSideAnchor;
}

/**
 * Represents a collapsible drawer.
 *
 * @param props -
 *        The properties for this drawer.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZDrawer(props: IZDrawer) {
  const { className, children, anchor, onClose, open } = props;
  const drawer = useRef<ZDrawerElement>(null);
  useWebComponent(ZDrawerElement);

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
    <z-drawer class={cssJoinDefined(className)} ref={drawer} anchor={anchor}>
      {children}
    </z-drawer>
  );
}
