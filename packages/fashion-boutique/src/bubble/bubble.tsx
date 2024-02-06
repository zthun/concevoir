import { ZSizeFixed, ZSizeVoid, createSizeChartFixedCss, createSizeChartFixedGeometric } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { useKeyboardActivate } from '@zthun/helpful-react';
import React, { KeyboardEvent, MouseEvent } from 'react';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZComponentWidth } from '../component/component-width.mjs';
import { useFashionTheme } from '../theme/fashion.mjs';
import { createStyleHook } from '../theme/styled';

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

const BubbleSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem')
};

const useBubbleStyles = createStyleHook(({ theme, tailor }, props: IZBubble) => {
  const {
    border = ZSizeVoid.None,
    width = ZSizeFixed.Medium,
    fashion = theme.component,
    padding = ZSizeVoid.None,
    onClick
  } = props;

  const size = BubbleSizeChart[width];
  const cursor = onClick ? 'pointer' : 'default';

  return {
    root: {
      'alignContent': 'center',
      'alignItems': 'center',
      'background': fashion.main,
      'color': fashion.contrast,
      cursor,
      'border': `${tailor.thickness(border)} solid ${fashion.border}`,
      'borderRadius': '50%',
      'clipPath': `circle()`,
      'display': 'flex',
      'flexDirection': 'column',
      'height': size,
      'justifyContent': 'center',
      'padding': tailor.gap(padding),
      'width': size,

      '&:focus': {
        background: onClick ? firstDefined(fashion.main, fashion.focus.main) : undefined,
        borderColor: onClick ? firstDefined(fashion.border, fashion.focus.border) : undefined,
        color: onClick ? firstDefined(fashion.contrast, fashion.focus.contrast) : undefined,
        outline: 'none'
      },

      '&:hover': {
        color: onClick ? firstDefined(fashion.contrast, fashion.hover.contrast) : undefined,
        background: onClick ? firstDefined(fashion.main, fashion.hover.main) : undefined,
        borderColor: onClick ? firstDefined(fashion.border, fashion.hover.border) : undefined
      }
    }
  };
});

export function ZBubble(props: IZBubble) {
  const { component } = useFashionTheme();
  const { children, className, name, border, fashion = component, onClick } = props;
  const { classes } = useBubbleStyles(props);
  const { onKey, tabIndex } = useKeyboardActivate(onClick);

  return (
    <div
      className={cssJoinDefined('ZBubble-root', className, classes.root)}
      data-name={name}
      data-border-size={border}
      data-fashion={fashion?.name}
      onClick={onClick}
      onKeyDown={onKey}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
}
