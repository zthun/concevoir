import { IZComponentFashion, IZComponentWidth, ZBoxElement } from '@zthun/fashion-boutique';
import { ZGapSize, ZSizeVaried, ZThicknessSize } from '@zthun/fashion-tailor';
import { IZQuadrilateral, cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React, { MouseEventHandler, MutableRefObject, useEffect, useRef } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useFashionWebComponent, useWidthWebComponent } from '../web-components/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-box']: ZBoxElement & any;
    }
  }
}

export function useBoxWebComponent(
  component: MutableRefObject<ZBoxElement | null | undefined>,
  edge: Partial<IZQuadrilateral<ZThicknessSize>> | undefined,
  trim: Partial<IZQuadrilateral<Property.BorderStyle>> | undefined,
  margin: Partial<IZQuadrilateral<ZGapSize | ZSizeVaried.Fit>> | undefined,
  padding: Partial<IZQuadrilateral<ZGapSize>> | undefined
) {
  useEffect(() => {
    component.current!.edge = edge;
    component.current!.trim = trim;
    component.current!.margin = margin;
    component.current!.padding = padding;
  }, [component.current, edge, trim, margin, padding]);
}

export interface IZBox extends IZComponentHierarchy, IZComponentStyle, IZComponentWidth, IZComponentFashion {
  edge?: Partial<IZQuadrilateral<ZThicknessSize>>;
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
  const { edge: border, trim } = props;
  const { padding } = props;
  const { children } = props;
  const tabIndex = onClick ? 0 : undefined;

  useEffect(() => ZBoxElement.register(), []);

  const box = useRef<ZBoxElement>();
  useBoxWebComponent(box, border, trim, margin, padding);
  useFashionWebComponent(box, fashion);
  useWidthWebComponent(box, width);

  return (
    <z-box class={cssJoinDefined(className)} tabIndex={tabIndex} onClick={onClick} ref={box}>
      {children}
    </z-box>
  );
}
