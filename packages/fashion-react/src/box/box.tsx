import { IZComponentFashion, IZComponentWidth, ZBoxElement, ZDeviceElement } from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZGapSize, ZSizeVaried, ZThicknessSize } from '@zthun/fashion-tailor';
import { IZQuadrilateral, cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React, { MouseEventHandler, MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

import '../background/device';

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

  const $width = useMemo(() => new ZDeviceBounds(width, ZSizeVaried.Fit).toDeviceMap(), [width]);

  useEffect(() => ZBoxElement.register(), []);
  useEffect(() => ZDeviceElement.register(), []);

  const box = useRef<ZBoxElement>();
  useBoxWebComponent(box, border, trim, margin, padding);

  return (
    <z-box class={cssJoinDefined(className)} fashion={fashion} tabIndex={tabIndex} onClick={onClick} ref={box}>
      <z-device xl={$width.xl} lg={$width.lg} md={$width.md} sm={$width.sm} xs={$width.xs} name='width' />
      {children}
    </z-box>
  );
}
