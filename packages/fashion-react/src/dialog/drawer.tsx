import { IZComponentHierarchy, ZDrawerElement } from '@zthun/fashion-boutique';
import { ZSideAnchor, cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';

/**
 * Represents props for the drawer.
 */
export interface IZDrawer extends IZComponentHierarchy<ReactNode>, IZComponentStyle {
  anchor?: ZSideAnchor;
  open: boolean;

  onClose?(): void;
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
  const { className, children, anchor, open, onClose } = props;
  const drawer = useRef<ZDrawerElement>(null);

  const onClosed = useCallback(() => {
    onClose?.call(null);
  }, [onClose]);

  useWebComponent(ZDrawerElement);

  useEffect(() => {
    drawer.current?.removeEventListener('close', onClosed);
    drawer.current?.addEventListener('close', onClosed);
    return () => drawer.current?.removeEventListener('close', onClosed);
  }, [drawer.current]);

  useEffect(() => {
    if (open) {
      drawer.current?.showModal?.call(drawer.current);
    } else {
      drawer.current?.close?.call(drawer.current);
    }
  }, [drawer.current, open]);

  return (
    <dialog
      is='z-drawer'
      // @ts-expect-error React 18 needs to use class for web components
      class={cssJoinDefined(className)}
      ref={drawer}
      data-anchor={anchor}
    >
      {children}
    </dialog>
  );
}
