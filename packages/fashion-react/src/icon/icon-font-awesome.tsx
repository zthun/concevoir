import { ZIconFontAwesomeElement } from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { useKeyboardActivate } from '@zthun/helpful-react';
import React from 'react';
import { useWebComponent } from '../component/use-web-component.mjs';
import { IZIcon } from './icon.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-icon-font-awesome']: ZIconFontAwesomeElement & any;
    }
  }
}

export interface IZIconFontAwesome extends IZIcon {
  family?: 'classic' | 'sharp' | 'brands';
  style?: 'solid' | 'regular' | 'duotone' | 'light' | 'thin';
}

export function ZIconFontAwesome(props: IZIconFontAwesome) {
  const { name, className, family, style, onClick, fashion, tooltip, width } = props;
  const { onKey, tabIndex } = useKeyboardActivate(onClick);
  const $width = new ZDeviceBounds(width, ZSizeFixed.Small);

  useWebComponent(ZIconFontAwesomeElement);

  return (
    <z-icon-font-awesome
      class={cssJoinDefined(className)}
      family={family}
      kind={style}
      name={name}
      fashion={fashion?.name}
      title={tooltip}
      onClick={onClick}
      onKeyDown={onKey}
      tabIndex={tabIndex}
    >
      <z-device name='width' xl={$width.xl()} lg={$width.lg()} md={$width.md()} sm={$width.sm()} xs={$width.xs()} />
    </z-icon-font-awesome>
  );
}
