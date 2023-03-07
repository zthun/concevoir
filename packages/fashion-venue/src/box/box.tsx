import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  IZFashion,
  IZFashionCoordination,
  ZFashionBuilder,
  ZFashionCoordinationBuilder,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid
} from '@zthun/fashion-chroma';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { get } from 'lodash';
import React, { MouseEventHandler } from 'react';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { makeStyles } from '../theme/theme';

interface IZFashionProps<TFashion> extends IZComponentFashion<TFashion> {
  focus?: TFashion;
  hover?: TFashion;
}

interface IZBorderProps extends IZFashionProps<IZFashion>, IZComponentWidth<ZSizeFixed | ZSizeVoid> {
  style?: Property.BorderStyle;
}

type ZBackgroundProps = IZFashionProps<IZFashionCoordination>;

type ZDimensionProps<TSizes> =
  | TSizes
  | { x?: TSizes; y?: TSizes }
  | { left?: TSizes; right?: TSizes; top?: TSizes; bottom?: TSizes };

const BoxSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss()
};

const normalizeBorderFields = (border?: IZBorderProps): Required<IZBorderProps> => {
  const transparent = new ZFashionBuilder().transparent().build();

  return {
    width: firstDefined(ZSizeVoid.None, border?.width),
    style: firstDefined('solid', border?.style),
    fashion: firstDefined(transparent, border?.fashion),
    focus: firstDefined(transparent, border?.focus, border?.fashion),
    hover: firstDefined(transparent, border?.hover, border?.fashion)
  };
};

const normalizeBackgroundFields = (background?: ZBackgroundProps): Required<ZBackgroundProps> => {
  const transparent = new ZFashionCoordinationBuilder().transparent().build();
  return {
    fashion: firstDefined(transparent, background?.fashion),
    focus: firstDefined(transparent, background?.focus, background?.fashion),
    hover: firstDefined(transparent, background?.hover, background?.fashion)
  };
};

export interface IZBox extends IZComponentHierarchy, IZComponentStyle, IZComponentWidth {
  border?: IZBorderProps;
  background?: ZBackgroundProps;

  padding?: ZDimensionProps<ZSizeFixed | ZSizeVoid>;
  margin?: ZDimensionProps<ZSizeFixed | ZSizeVaried.Fit | ZSizeVoid>;

  onClick?: MouseEventHandler;
}

const useBoxStyles = makeStyles<IZBox>()((theme, props) => {
  const { padding, margin, border, width, background, onClick } = props;
  const _border = normalizeBorderFields(border);
  const _background = normalizeBackgroundFields(background);

  const __border = (fashion: IZFashion) =>
    `${theme.thickness(_border.width)}  ${_border.style} ${theme.colorify(fashion)}`;

  const asPadding = (pad: ZSizeFixed | ZSizeVoid | object) => {
    const size = typeof pad === 'object' ? ZSizeVoid.None : pad;
    return theme.gap(size);
  };

  const asMargin = (margin: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit | object) => {
    if (typeof margin === 'object') {
      return theme.gap(ZSizeVoid.None);
    }

    if (margin === ZSizeVaried.Fit) {
      return 'auto';
    }

    return theme.gap(margin);
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
      'cursor': onClick ? 'pointer' : 'default',
      'border': __border(_border.fashion),
      'width': BoxSizeChart[firstDefined(ZSizeVaried.Fit, width)],
      'backgroundColor': theme.colorify(_background.fashion.main),
      'color': theme.colorify(_background.fashion.contrast),

      '&:focus': {
        border: __border(_border.focus),
        backgroundColor: theme.colorify(_background.focus.main),
        color: theme.colorify(_background.focus.contrast)
      },

      '&:hover': {
        border: __border(_border.hover),
        backgroundColor: theme.colorify(_background.hover.main),
        color: theme.colorify(_background.hover.contrast)
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
