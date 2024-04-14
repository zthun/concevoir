import { IZComponentHierarchy } from '@zthun/fashion-boutique';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useState } from 'react';
import { IZButton, ZButton } from '../button/button';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZPopup, ZPopup } from './popup';

/**
 * Represents properties for a pop button component.
 */
export interface IZPopupButton extends IZComponentHierarchy<ReactNode>, IZComponentStyle {
  /**
   * The properties for the underlying button component.
   */
  ButtonProps?: Omit<IZButton, 'onClick'>;
  /**
   * The properties for the underlying popup component
   */
  PopupProps?: Omit<IZPopup, 'attach' | 'children'>;
}

/**
 * Renders a button that drops pop content.
 *
 * @param props -
 *        The properties for this button menu.
 *
 * @returns
 *        The JSX to render the button menu.
 */
export function ZPopupButton(props: IZPopupButton) {
  const { ButtonProps, PopupProps, children, className } = props;
  const [attach, setAttach] = useState<Element | null>(null);

  return (
    <>
      <ZButton
        {...ButtonProps}
        className={cssJoinDefined('ZPopupButton-root', className)}
        onClick={(e) => setAttach(e.currentTarget)}
      />
      <ZPopup {...PopupProps} attach={attach} onClose={setAttach.bind(null, null)}>
        {children}
      </ZPopup>
    </>
  );
}
