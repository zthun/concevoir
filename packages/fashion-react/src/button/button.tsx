import React, { ReactNode, useMemo } from 'react';

import {
  IZComponentDisabled,
  IZComponentFashion,
  IZComponentLabel,
  IZComponentLoading,
  IZComponentName,
  IZComponentWidth,
  ZButtonElement,
  ZDeviceElement
} from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeVaried } from '@zthun/fashion-tailor';
import { IZComponentAvatar } from '../component/component-avatar.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';

export interface IZButton
  extends IZComponentAvatar,
    IZComponentLabel<ReactNode>,
    IZComponentDisabled,
    IZComponentLoading,
    IZComponentStyle,
    IZComponentName,
    IZComponentFashion,
    IZComponentWidth<ZSizeVaried> {
  borderless?: boolean;
  compact?: boolean;
  outline?: boolean;
  tooltip?: string;

  onClick?: (e: React.MouseEvent) => any;
}

/**
 * Represents a basic button component.
 *
 * @param props -
 *        The properties for this button.
 *
 * @returns The JSX to render this button.
 */
export function ZButton(props: IZButton) {
  const {
    avatar,
    className,
    borderless,
    compact,
    disabled,
    fashion,
    loading,
    label,
    name,
    outline,
    tooltip,
    width,
    onClick
  } = props;

  const $width = useMemo(() => new ZDeviceBounds(width, ZSizeVaried.Fit).toDeviceMap(), [width]);
  useWebComponent(ZButtonElement);
  useWebComponent(ZDeviceElement);

  return (
    <button
      // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
      class={className}
      data-borderless={borderless}
      data-compact={compact}
      data-fashion={fashion}
      data-loading={loading}
      data-outline={outline}
      disabled={disabled || undefined}
      name={name}
      title={tooltip}
      is='z-button'
      onClick={onClick}
    >
      <z-device xl={$width.xl} lg={$width.lg} md={$width.md} sm={$width.sm} xs={$width.xs} name='width'></z-device>
      <div className='ZButton-avatar' style={{ display: avatar ? 'block' : 'none' }}>
        {avatar}
      </div>
      <div className='ZButton-label' style={{ display: label ? 'block' : 'none' }}>
        {label}
      </div>
    </button>
  );
}
