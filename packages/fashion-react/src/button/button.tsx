import { Tooltip } from '@mui/material';
import React, { ReactNode, useEffect } from 'react';

import { IZComponentFashion, IZComponentLoading, IZComponentWidth, ZButtonElement } from '@zthun/fashion-boutique';
import { ZSizeVaried } from '@zthun/fashion-tailor';
import { IZComponentAvatar } from '../component/component-avatar.mjs';
import { IZComponentDisabled } from '../component/component-disabled.mjs';
import { IZComponentLabel } from '../component/component-label.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

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
  tooltip?: ReactNode;

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
  const { avatar, className, borderless, compact, disabled, fashion, loading, label, name, outline, tooltip, onClick } =
    props;

  useEffect(() => ZButtonElement.register(), []);

  return (
    <Tooltip title={tooltip}>
      <span>
        <z-button
          borderless={borderless}
          class={className}
          compact={compact}
          disabled={disabled}
          fashion={fashion}
          loading={loading}
          outline={outline}
          name={name}
          onClick={onClick}
        >
          <div slot='prefix'>{avatar}</div>
          <div>{label}</div>
        </z-button>
      </span>
    </Tooltip>
  );
}
