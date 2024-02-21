import { IZComponentWidth, ZBoxElement } from '@zthun/fashion-boutique';
import { ZGapSize, ZSizeVaried, ZThicknessSize } from '@zthun/fashion-tailor';
import { IZQuadrilateral, cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React, { MouseEventHandler, useEffect, useRef } from 'react';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import {
  useBorderWebComponent,
  useFashionWebComponent,
  useMarginWebComponent,
  usePaddingWebComponent,
  useWidthWebComponent
} from '../web-components/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-box']: ZBoxElement & any;
    }
  }
}

export interface IZBox extends IZComponentHierarchy, IZComponentStyle, IZComponentWidth, IZComponentFashion {
  border?: Partial<IZQuadrilateral<ZThicknessSize>>;
  trim?: Partial<IZQuadrilateral<Property.BorderStyle>>;

  padding?: Partial<IZQuadrilateral<ZGapSize>>;
  margin?: Partial<IZQuadrilateral<ZGapSize | ZSizeVaried.Fit>>;

  onClick?: MouseEventHandler;
}

/**
 * Just a box.
 *
 * @param props -
 *        The properties for the box
 *
 * @returns
 *        The JSX to render the box.
 */
export function ZBox(props: IZBox) {
  const { className, fashion, onClick } = props;
  const { width } = props;
  const { margin } = props;
  const { border, trim } = props;
  const { padding } = props;
  const { children } = props;
  const tabIndex = onClick ? 0 : undefined;

  useEffect(() => ZBoxElement.register(), []);

  const box = useRef<ZBoxElement>();
  useBorderWebComponent(box, border, trim);
  useFashionWebComponent(box, fashion);
  useWidthWebComponent(box, width);
  useMarginWebComponent(box, margin);
  usePaddingWebComponent(box, padding);

  return (
    <z-box class={cssJoinDefined(className)} tabIndex={tabIndex} onClick={onClick} ref={box}>
      {children}
    </z-box>
  );
}
