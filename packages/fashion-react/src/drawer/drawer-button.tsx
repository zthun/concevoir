import { IZComponentHierarchy } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useEffect, useState } from 'react';
import { IZButton, ZButton } from '../button/button';
import { IZComponentStyle } from '../component/component-style.mjs';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { IZDrawer, ZDrawer } from './drawer';

/**
 * The props for the drawer button.
 */
export interface IZDrawerButton extends IZComponentHierarchy<ReactNode>, IZComponentStyle {
  ButtonProps?: Omit<IZButton, 'onClick' | 'avatar' | 'label'>;
  DrawerProps?: Omit<IZDrawer, 'open' | 'onClose' | 'children'>;

  closeOnChange?: any[];
  icon?: ReactNode;
}

/**
 * Represents a button for a drawer.
 *
 * You can use this to maintain an open/close state of a drawer.
 *
 * @param props -
 *        The properties for this drawer.
 *
 * @returns
 *        The JSX for this component.
 */
export function ZDrawerButton(props: IZDrawerButton) {
  const {
    className,
    closeOnChange,
    ButtonProps,
    DrawerProps,
    children,
    icon = <ZIconFontAwesome name='bars' width={ZSizeFixed.ExtraSmall} />
  } = props;
  const [open, setOpen] = useState(false);
  const _className = cssJoinDefined('ZDrawerButton-root', className);

  useEffect(() => {
    setOpen(false);
  }, closeOnChange || []);

  return (
    <div className={_className}>
      <ZButton {...ButtonProps} label={icon} avatar={null} onClick={setOpen.bind(null, true)} />
      <ZDrawer {...DrawerProps} open={!!open} onClose={setOpen.bind(null, false)}>
        {children}
      </ZDrawer>
    </div>
  );
}
