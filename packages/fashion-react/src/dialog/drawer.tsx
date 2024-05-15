import { IZComponentHierarchy, ZDrawerElement } from '@zthun/fashion-boutique';
import { ZSideAnchor, cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useRef } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';
import { IZDialogProps, useDialog } from './use-dialog';

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
  const { className, children, anchor } = props;
  const drawer = useRef<ZDrawerElement>(null);
  useDialog(drawer.current, props);
  useWebComponent(ZDrawerElement);

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
