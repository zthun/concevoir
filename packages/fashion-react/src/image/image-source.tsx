import {
  IZComponentHeight,
  IZComponentName,
  IZComponentSource,
  IZComponentWidth,
  ZImageSourceElement
} from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-image-source']: ZImageSourceElement & any;
    }
  }
}

export interface IZImageSource
  extends IZComponentSource,
    IZComponentStyle,
    IZComponentWidth,
    IZComponentHeight,
    IZComponentName {}

/**
 * Represents an image.
 *
 * This is a shortcut to placing an image tag, but it also supports svg data urls.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns The jsx for this component.
 */
export function ZImageSource(props: IZImageSource) {
  const { className, src, name, width, height } = props;
  useWebComponent(ZImageSourceElement);
  const w = new ZDeviceBounds(width, ZSizeVaried.Fit);
  const h = new ZDeviceBounds(height, ZSizeVaried.Fit);

  return (
    <z-image-source class={cssJoinDefined(className)} name={name} src={src}>
      <z-device name='width' xl={w.xl()} lg={w.lg()} md={w.md()} sm={w.sm()} xs={w.xs()} />
      <z-device name='height' xl={h.xl()} lg={h.lg()} md={h.md()} sm={h.sm()} xs={h.xs()} />
    </z-image-source>
  );
}
