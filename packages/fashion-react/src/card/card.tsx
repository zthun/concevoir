import {
  IZComponentAvatar,
  IZComponentFashion,
  IZComponentHeading,
  IZComponentHeight,
  IZComponentHierarchy,
  IZComponentLoading,
  IZComponentName,
  IZComponentWidth,
  ZCardElement,
  ZDeviceElement
} from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { pickBy, startsWith } from 'lodash-es';
import React, { ReactNode } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-card']: ZCardElement & any;
    }
  }
}

export interface IZCard
  extends IZComponentHeading<ReactNode>,
    IZComponentAvatar<ReactNode>,
    IZComponentHierarchy<ReactNode>,
    IZComponentLoading,
    IZComponentFashion,
    IZComponentStyle,
    IZComponentName,
    IZComponentWidth,
    IZComponentHeight {
  footer?: ReactNode;
}

/**
 * Represents a basic card component.
 *
 * @param props -
 *        The properties to the card.
 *
 * @returns
 *        The JSX to render the card.
 */
export function ZCard(props: IZCard) {
  const { avatar, className, children, footer, heading, subHeading, loading, fashion, name, width, height } = props;
  useWebComponent(ZCardElement);
  useWebComponent(ZDeviceElement);
  const $width = new ZDeviceBounds(width, ZSizeVaried.Fit);
  const $height = new ZDeviceBounds(height, ZSizeVaried.Fit);

  return (
    <z-card
      class={cssJoinDefined(className)}
      fashion={fashion}
      loading={loading}
      name={name}
      {...pickBy(props, (_, k) => startsWith(k, 'data-'))}
    >
      <z-device name='width' xl={$width.xl()} lg={$width.lg()} md={$width.md} sm={$width.sm()} xs={$width.xs()} />
      <z-device name='height' xl={$height.xl()} lg={$height.lg()} md={$height.md} sm={$height.sm()} xs={$height.xs()} />
      <div slot='avatar'>{avatar}</div>
      <div slot='heading'>{heading}</div>
      <div slot='subheading'>{subHeading}</div>
      <div slot='body'>{children}</div>
      {footer && <div slot='footer'>{footer}</div>}
    </z-card>
  );
}
