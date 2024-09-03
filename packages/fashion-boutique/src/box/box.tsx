import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
} from "@zthun/fashion-tailor";
import {
  cssJoinDefined,
  firstDefined,
  ZHorizontalAnchor,
} from "@zthun/helpful-fn";
import { Property } from "csstype";
import { get } from "lodash-es";
import React, { MouseEventHandler } from "react";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import { createStyleHook } from "../theme/styled";

interface IZBorderProps
  extends Pick<IZComponentWidth<ZSizeFixed | ZSizeVoid>, "width"> {
  style?: Property.BorderStyle;
}

type ZDimensionProps<TSizes> =
  | TSizes
  | { x?: TSizes; y?: TSizes }
  | { left?: TSizes; right?: TSizes; top?: TSizes; bottom?: TSizes };

const BoxSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), "rem"),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss(),
};

export interface IZBox
  extends IZComponentHierarchy,
    IZComponentStyle,
    IZComponentWidth,
    IZComponentFashion {
  border?: IZBorderProps;

  padding?: ZDimensionProps<ZSizeFixed | ZSizeVoid>;
  margin?: ZDimensionProps<ZSizeFixed | ZSizeVaried.Fit | ZSizeVoid>;

  justification?: ZHorizontalAnchor;

  onClick?: MouseEventHandler;
}

const useBoxStyles = createStyleHook(({ tailor, device }, props: IZBox) => {
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
    justification,
    onClick,
  } = props;

  const asPadding = (pad: ZSizeFixed | ZSizeVoid | object) => {
    const size = typeof pad === "object" ? ZSizeVoid.None : pad;
    return tailor.gap(size);
  };

  const asMargin = (
    margin: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit | object,
  ) => {
    if (typeof margin === "object") {
      return tailor.gap(ZSizeVoid.None);
    }

    if (margin === ZSizeVaried.Fit) {
      return "auto";
    }

    return tailor.gap(margin);
  };

  const dimensions = {
    maxWidth: BoxSizeChart[width],

    [device.break(ZSizeFixed.Large)]: {
      maxWidth: BoxSizeChart[widthLg],
    },

    [device.break(ZSizeFixed.Medium)]: {
      maxWidth: BoxSizeChart[widthMd],
    },

    [device.break(ZSizeFixed.Small)]: {
      maxWidth: BoxSizeChart[widthSm],
    },

    [device.break(ZSizeFixed.ExtraSmall)]: {
      maxWidth: BoxSizeChart[widthXs],
    },
  };

  const pLeft = firstDefined(
    ZSizeVoid.None,
    get(padding, "left"),
    get(padding, "x"),
    padding,
  );
  const pRight = firstDefined(
    ZSizeVoid.None,
    get(padding, "right"),
    get(padding, "x"),
    padding,
  );
  const pTop = firstDefined(
    ZSizeVoid.None,
    get(padding, "top"),
    get(padding, "y"),
    padding,
  );
  const pBottom = firstDefined(
    ZSizeVoid.None,
    get(padding, "bottom"),
    get(padding, "y"),
    padding,
  );

  const mLeft = firstDefined(
    ZSizeVoid.None,
    get(margin, "left"),
    get(margin, "x"),
    margin,
  );
  const mRight = firstDefined(
    ZSizeVoid.None,
    get(margin, "right"),
    get(margin, "x"),
    margin,
  );
  const mTop = firstDefined(
    ZSizeVoid.None,
    get(margin, "top"),
    get(margin, "y"),
    margin,
  );
  const mBottom = firstDefined(
    ZSizeVoid.None,
    get(margin, "bottom"),
    get(margin, "y"),
    margin,
  );

  return {
    root: {
      ...dimensions,
      cursor: onClick ? "pointer" : "default",
      borderWidth: border?.width,
      borderStyle: border?.style,
      borderColor: fashion?.idle.border,
      backgroundColor: fashion?.idle.main,
      color: fashion?.idle.contrast,

      "&:focus": {
        borderColor: firstDefined(fashion?.idle.border, fashion?.focus?.border),
        backgroundColor: firstDefined(fashion?.idle.main, fashion?.focus?.main),
        color: firstDefined(fashion?.idle.contrast, fashion?.focus?.contrast),
      },

      "&:hover": {
        borderColor: firstDefined(fashion?.idle.border, fashion?.hover?.border),
        backgroundColor: firstDefined(fashion?.idle.main, fashion?.hover?.main),
        color: firstDefined(fashion?.idle.contrast, fashion?.hover?.contrast),
      },
      paddingLeft: asPadding(pLeft),
      paddingRight: asPadding(pRight),
      paddingTop: asPadding(pTop),
      paddingBottom: asPadding(pBottom),
      marginLeft: asMargin(mLeft),
      marginRight: asMargin(mRight),
      marginTop: asMargin(mTop),
      marginBottom: asMargin(mBottom),
      textAlign: justification,
    },
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
    <div
      className={cssJoinDefined("ZBox-root", className, classes.root)}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
