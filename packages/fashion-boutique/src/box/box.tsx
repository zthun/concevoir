import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid
} from '@zthun/fashion-tailor';
import { IZFashion, transparent, ZColor } from '@zthun/fashion-theme';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { get } from 'lodash';
import React, { MouseEventHandler } from 'react';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { createStyleHook } from '../theme/styled';

interface IZBorderProps extends Pick<IZComponentWidth<ZSizeFixed | ZSizeVoid>, 'width'> {
  style?: Property.BorderStyle;
}

type ZDimensionProps<TSizes> =
  | TSizes
  | { x?: TSizes; y?: TSizes }
  | { left?: TSizes; right?: TSizes; top?: TSizes; bottom?: TSizes };

const BoxSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss()
};

export interface IZBox extends IZComponentHierarchy, IZComponentStyle, IZComponentWidth, IZComponentFashion {
  border?: IZBorderProps;

  focus?: IZFashion;
  hover?: IZFashion;

  padding?: ZDimensionProps<ZSizeFixed | ZSizeVoid>;
  margin?: ZDimensionProps<ZSizeFixed | ZSizeVaried.Fit | ZSizeVoid>;

  onClick?: MouseEventHandler;
}

const useBoxStyles = createStyleHook(({ theme, tailor, device }, props: IZBox) => {
  const {
    padding,
    margin,
    border,
    width = ZSizeVaried.Fit,
    widthLg = width,
    widthMd = widthLg,
    widthSm = widthMd,
    widthXs = widthSm,
    fashion,
    focus,
    hover,
    onClick
  } = props;

  const _border = {
    width: firstDefined(ZSizeVoid.None, border?.width),
    style: firstDefined('solid', border?.style),
    fashion: firstDefined(transparent(), fashion?.dark),
    focus: firstDefined(transparent(), focus?.dark, fashion?.dark),
    hover: firstDefined(transparent(), hover?.dark, fashion?.dark)
  };

  const _background = {
    fashion: firstDefined(theme.transparent, fashion),
    focus: firstDefined(theme.transparent, focus, fashion),
    hover: firstDefined(theme.transparent, hover, fashion)
  };

  const __border = (color: ZColor) => `${tailor.thickness(_border.width)} ${_border.style} ${color}`;

  const asPadding = (pad: ZSizeFixed | ZSizeVoid | object) => {
    const size = typeof pad === 'object' ? ZSizeVoid.None : pad;
    return tailor.gap(size);
  };

  const asMargin = (margin: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit | object) => {
    if (typeof margin === 'object') {
      return tailor.gap(ZSizeVoid.None);
    }

    if (margin === ZSizeVaried.Fit) {
      return 'auto';
    }

    return tailor.gap(margin);
  };

  const dimensions = {
    maxWidth: BoxSizeChart[width],

    [device.break(ZSizeFixed.Large)]: {
      maxWidth: BoxSizeChart[widthLg]
    },

    [device.break(ZSizeFixed.Medium)]: {
      maxWidth: BoxSizeChart[widthMd]
    },

    [device.break(ZSizeFixed.Small)]: {
      maxWidth: BoxSizeChart[widthSm]
    },

    [device.break(ZSizeFixed.ExtraSmall)]: {
      maxWidth: BoxSizeChart[widthXs]
    }
  };

  const pLeft = firstDefined(ZSizeVoid.None, get(padding, 'left'), get(padding, 'x'), padding);
  const pRight = firstDefined(ZSizeVoid.None, get(padding, 'right'), get(padding, 'x'), padding);
  const pTop = firstDefined(ZSizeVoid.None, get(padding, 'top'), get(padding, 'y'), padding);
  const pBottom = firstDefined(ZSizeVoid.None, get(padding, 'bottom'), get(padding, 'y'), padding);

  const mLeft = firstDefined(ZSizeVoid.None, get(margin, 'left'), get(margin, 'x'), margin);
  const mRight = firstDefined(ZSizeVoid.None, get(margin, 'right'), get(margin, 'x'), margin);
  const mTop = firstDefined(ZSizeVoid.None, get(margin, 'top'), get(margin, 'y'), margin);
  const mBottom = firstDefined(ZSizeVoid.None, get(margin, 'bottom'), get(margin, 'y'), margin);

  return {
    root: {
      ...dimensions,
      'cursor': onClick ? 'pointer' : 'default',
      'border': __border(_border.fashion),
      'backgroundColor': _background.fashion.main,
      'color': _background.fashion.contrast,

      '&:focus': {
        border: __border(_border.focus),
        backgroundColor: _background.focus.main,
        color: _background.focus.contrast
      },

      '&:hover': {
        border: __border(_border.hover),
        backgroundColor: _background.hover.main,
        color: _background.hover.contrast
      },
      'paddingLeft': asPadding(pLeft),
      'paddingRight': asPadding(pRight),
      'paddingTop': asPadding(pTop),
      'paddingBottom': asPadding(pBottom),
      'marginLeft': asMargin(mLeft),
      'marginRight': asMargin(mRight),
      'marginTop': asMargin(mTop),
      'marginBottom': asMargin(mBottom)
    }
  };
});

/**
 * Just a box.
 *
 * @param props -
 *        The properties for the box
 *
 * @returns
 *        The JSX to render the box.
 */
export function ZBox(props: IZBox) {
  const { className, children, onClick } = props;
  const { classes } = useBoxStyles(props);
  const tabIndex = onClick ? 0 : undefined;

  return (
    <div className={cssJoinDefined('ZBox-root', className, classes.root)} tabIndex={tabIndex} onClick={onClick}>
      {children}
    </div>
  );
}
