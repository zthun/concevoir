import { ZDeviceElement, ZGridSpanElement } from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZDeviceValue } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-grid-span']: ZGridSpanElement & any;
    }
  }
}

export interface IZGridSpan extends IZComponentHierarchy, IZComponentStyle {
  columnStart?: ZDeviceValue<Property.GridColumnStart>;
  columnEnd?: ZDeviceValue<Property.GridColumnEnd>;
  rowStart?: ZDeviceValue<Property.GridRowStart>;
  rowEnd?: ZDeviceValue<Property.GridRowEnd>;
}

export function ZGridSpan(props: IZGridSpan) {
  const { className, children, columnStart, columnEnd, rowStart, rowEnd } = props;

  const $cs = new ZDeviceBounds(columnStart, 'auto');
  const $ce = new ZDeviceBounds(columnEnd, 'auto');
  const $rs = new ZDeviceBounds(rowStart, 'auto');
  const $re = new ZDeviceBounds(rowEnd, 'auto');

  useWebComponent(ZDeviceElement);
  useWebComponent(ZGridSpanElement);

  return (
    <z-grid-span className={cssJoinDefined(className)}>
      <z-device name='column-start' xl={$cs.xl()} lg={$cs.lg()} md={$cs.md()} sm={$cs.sm()} xs={$cs.xs()} />
      <z-device name='column-end' xl={$ce.xl()} lg={$ce.lg()} md={$ce.md()} sm={$ce.sm()} xs={$ce.xs()} />
      <z-device name='row-start' xl={$rs.xl()} lg={$rs.lg()} md={$rs.md()} sm={$rs.sm()} xs={$rs.xs()} />
      <z-device name='row-end' xl={$re.xl()} lg={$re.lg()} md={$re.md()} sm={$re.sm()} xs={$re.xs()} />
      {children}
    </z-grid-span>
  );
}
