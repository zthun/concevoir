import { IZComponentFashion, IZComponentName, IZComponentWidth, ZBubbleElement } from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZGapSize, ZSizeFixed, ZSizeVoid } from '@zthun/fashion-tailor';
import { ZQuadrilateralBuilder, cssJoinDefined, firstTruthy } from '@zthun/helpful-fn';
import { useKeyboardActivate } from '@zthun/helpful-react';
import React, { KeyboardEvent, MouseEvent } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-bubble']: ZBubbleElement & any;
    }
  }
}

export interface IZBubble
  extends IZComponentStyle,
    IZComponentName,
    IZComponentWidth<ZSizeFixed>,
    IZComponentHierarchy,
    IZComponentFashion {
  padding?: ZSizeFixed | ZSizeVoid;
  border?: ZSizeFixed | ZSizeVoid;

  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

export function ZBubble(props: IZBubble) {
  const { children, className, name, border, fashion, padding, width, onClick } = props;
  const { onKey, tabIndex } = useKeyboardActivate(onClick);
  const $width = new ZDeviceBounds(width, ZSizeFixed.Medium);
  const $padding = new ZQuadrilateralBuilder<ZGapSize>(firstTruthy(ZSizeVoid.None, padding)).build();
  useWebComponent(ZBubbleElement);

  return (
    <z-bubble
      class={cssJoinDefined(className)}
      active={!!onClick}
      name={name}
      fashion={fashion}
      border={border}
      onClick={onClick}
      onKeyDown={onKey}
      tabIndex={tabIndex}
    >
      <z-device name='width' xl={$width.xl()} lg={$width.lg()} md={$width.md()} sm={$width.sm()} xs={$width.xs()} />
      <z-quadrilateral
        name='padding'
        left={$padding.left}
        right={$padding.right}
        top={$padding.top}
        bottom={$padding.bottom}
      />
      {children}
    </z-bubble>
  );
}
