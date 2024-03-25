import { ZPopupElement } from '@zthun/fashion-boutique';
import { ZAnchor, ZHorizontalAnchor, ZVerticalAnchor } from '@zthun/helpful-fn';
import React, { useEffect, useRef } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-popup']: ZPopupElement & any;
    }
  }
}

/**
 * Represents props for a popup component.
 */
export interface IZPopup extends IZComponentHierarchy, IZComponentStyle {
  /**
   * The position the popup is attached to.
   *
   * If this is falsy, then the popup is closed.
   */
  attach?: Element | null;

  /**
   * The callback for when the popup requests to be closed.
   */
  onClose?(): void;

  /**
   * The origin point at which to popup opens relative to the
   * popup position.
   *
   * If the attach is an element, this is the origin on that element. If it is
   * a point, then this is ignored and it is opened at that point.
   */
  attachOrigin?: ZAnchor;

  /**
   * The origin of the popup relative to the attach point or attachOrigin.
   *
   * This is the point that is referenced on the popup which is consistent every
   * time it is opened, regardless of the popup content.
   */
  popupOrigin?: ZAnchor;
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
    attachOrigin = [ZVerticalAnchor.Bottom, ZHorizontalAnchor.Left],
    popupOrigin = [ZVerticalAnchor.Top, ZHorizontalAnchor.Left],
    onClose
  } = props;
  const popper = useRef<ZPopupElement>(null);

  const onClosed = () => {
    onClose?.call(null);
  };

  useEffect(() => {
    popper.current?.removeEventListener(ZPopupElement.EventClosed, onClosed);
    popper.current?.addEventListener(ZPopupElement.EventClosed, onClosed);

    return () => popper.current?.removeEventListener(ZPopupElement.EventClosed, onClosed);
  }, [popper.current]);

  useEffect(() => {
    if (attach) {
      popper.current?.open(attach, { autoClose: true, anchor: attachOrigin, origin: popupOrigin });
    } else {
      popper.current?.close();
    }
  }, [popper.current, attach]);

  return (
    <z-popup class={className} ref={popper}>
      {children}
    </z-popup>
  );
}
