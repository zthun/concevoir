import { ZIconMaterialElement } from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { useKeyboardActivate } from '@zthun/helpful-react';
import React from 'react';
import { useWebComponent } from '../component/use-web-component.mjs';
import { IZIcon } from './icon.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-icon-material']: ZIconMaterialElement & any;
    }
  }
}

export function ZIconMaterial(props: IZIcon) {
  const { name, fashion, className, onClick, tooltip, width } = props;
  const { onKey, tabIndex } = useKeyboardActivate(onClick);
  const $width = new ZDeviceBounds(width, ZSizeFixed.Small);
  useWebComponent(ZIconMaterialElement);

  return (
    <z-icon-material
      class={cssJoinDefined(className)}
      name={name}
      fashion={fashion}
      title={tooltip}
      onClick={onClick}
      onKeyDown={onKey}
      tabIndex={tabIndex}
    >
      <z-device name='width' xl={$width.xl()} lg={$width.lg()} md={$width.md()} sm={$width.sm()} xs={$width.xs()} />
    </z-icon-material>
  );
}
