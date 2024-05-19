import { ZDialogPopupElement } from '@zthun/fashion-boutique';
import { ZAnchor, ZHorizontalAnchor, ZVerticalAnchor, cssJoinDefined, firstTruthy } from '@zthun/helpful-fn';
import React, { useEffect, useRef } from 'react';
import { useWebComponent } from '../component/use-web-component.mjs';
import { IZDialog, useDialog } from './use-dialog';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-dialog-popup']: ZDialogPopupElement & any;
    }
  }
}

export interface IZPopup extends IZDialog {
  attach?: Element | null;

  onClose?(): void;

  anchor?: ZAnchor;
  origin?: ZAnchor;
}

/**
 * Represents a popup that houses content.
 *
 * @param props -
 *        The properties for the popup.
 *
 * @returns
 *        The JSX to render the popup content.
 */
export function ZPopup(props: IZPopup) {
  const {
    className,
    children,
    attach,
    name,
    fashion,
    persistent,
    anchor = [ZVerticalAnchor.Bottom, ZHorizontalAnchor.Left],
    origin = [ZVerticalAnchor.Top, ZHorizontalAnchor.Left],
    renderHeader,
    renderFooter
  } = props;
  const popper = useRef<ZDialogPopupElement>(null);

  useWebComponent(ZDialogPopupElement);
  useDialog(popper.current, props);

  useEffect(() => {
    popper.current?.attachTo(attach);
  }, [popper.current, attach]);

  return (
    <z-dialog-popup
      class={cssJoinDefined(className)}
      fashion={fashion}
      name={name}
      persistent={firstTruthy(undefined, persistent)}
      origin-x={firstTruthy(undefined, origin[1])}
      origin-y={firstTruthy(undefined, origin[0])}
      anchor-x={firstTruthy(undefined, anchor[1])}
      anchor-y={firstTruthy(undefined, anchor[0])}
      ref={popper}
    >
      <div slot='header'>{renderHeader?.call(null)}</div>
      {children}
      {<div slot='footer'>{renderFooter?.call(null)}</div>}
    </z-dialog-popup>
  );
}
