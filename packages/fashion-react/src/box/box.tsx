import {
  IZComponentFashion,
  IZComponentWidth,
  ZBoxElement,
  ZDeviceElement,
  ZQuadrilateralElement
} from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZGapSize, ZSizeVaried, ZThicknessSize } from '@zthun/fashion-tailor';
import { IZQuadrilateral, cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React, { MouseEventHandler, useMemo } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

import { includeCustomElement } from '@zthun/helpful-dom';
import '../background/device';
import '../background/quadrilateral';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-box']: ZBoxElement & any;
    }
  }
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
  const { edge, trim } = props;
  const { margin: m, padding: p } = props;
  const { children } = props;
  const tabIndex = onClick ? 0 : undefined;

  const $width = useMemo(() => new ZDeviceBounds(width, ZSizeVaried.Fit).toDeviceMap(), [width]);

  useMemo(() => ZBoxElement.register(), []);
  useMemo(() => includeCustomElement(ZDeviceElement), []);
  useMemo(() => includeCustomElement(ZQuadrilateralElement), []);

  return (
    <z-box class={cssJoinDefined(className)} fashion={fashion} tabIndex={tabIndex} onClick={onClick}>
      <z-device xl={$width.xl} lg={$width.lg} md={$width.md} sm={$width.sm} xs={$width.xs} name='width' />
      <z-quadrilateral bottom={m?.bottom} left={m?.left} right={m?.right} top={m?.top} name='margin' />
      <z-quadrilateral bottom={p?.bottom} left={p?.left} right={p?.right} top={p?.top} name='padding' />
      <z-quadrilateral bottom={edge?.bottom} left={edge?.top} right={edge?.right} top={edge?.top} name='edge' />
      <z-quadrilateral bottom={trim?.bottom} left={trim?.top} right={trim?.right} top={trim?.top} name='trim' />
      {children}
    </z-box>
  );
}
