import React, { useMemo } from 'react';

import {
  IZComponentDisabled,
  IZComponentFashion,
  IZComponentLoading,
  IZComponentWidth,
  ZButtonElement
} from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeVaried } from '@zthun/fashion-tailor';
import { includeCustomElement } from '@zthun/helpful-dom';
import { IZComponentAvatar } from '../component/component-avatar.mjs';
import { IZComponentLabel } from '../component/component-label.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

import '../background/device';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-button']: ZButtonElement & any;
    }
  }
}

export interface IZButton
  extends IZComponentAvatar,
    IZComponentLabel,
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

  useMemo(() => includeCustomElement(ZButtonElement), []);

  return (
    <z-button
      borderless={borderless}
      class={className}
      compact={compact}
      disabled={disabled}
      fashion={fashion}
      loading={loading}
      outline={outline}
      name={name}
      title={tooltip}
      onClick={onClick}
    >
      <z-device xl={$width.xl} lg={$width.lg} md={$width.md} sm={$width.sm} xs={$width.xs} name='width'></z-device>
      <div slot='prefix'>{avatar}</div>
      <div>{label}</div>
    </z-button>
  );
}
