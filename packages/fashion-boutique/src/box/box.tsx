import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeThickness,
  ZSizeVaried,
  ZSizeVoid,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import {
  cssJoinDefined,
  firstDefined,
  ZHorizontalAnchor,
} from "@zthun/helpful-fn";
import { Property } from "csstype";
import { get } from "lodash-es";
import { MouseEventHandler } from "react";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import { createStyleHook } from "../theme/styled";

interface IZBorderProps
  extends IZComponentWidth<ZSizeThickness, ZSizeThickness> {
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

const useBoxStyles = createStyleHook(
  ({ theme, tailor, device }, props: IZBox) => {
    const { transparent } = theme;
    const {
      padding,
      margin,
      border,
      width,
      fashion = transparent,
      justification,
      onClick,
    } = props;

    const _width = new ZDeviceValues(width, ZSizeVaried.Fit);
    const _fashion = new ZColorPicker(fashion);

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
      maxWidth: BoxSizeChart[_width.xl],

      [device.break(ZSizeFixed.Large)]: {
        maxWidth: BoxSizeChart[_width.lg],
      },

      [device.break(ZSizeFixed.Medium)]: {
        maxWidth: BoxSizeChart[_width.md],
      },

      [device.break(ZSizeFixed.Small)]: {
        maxWidth: BoxSizeChart[_width.sm],
      },

      [device.break(ZSizeFixed.ExtraSmall)]: {
        maxWidth: BoxSizeChart[_width.xs],
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
        borderColor: _fashion.idle.border,
        backgroundColor: _fashion.idle.main,
        color: _fashion.idle.contrast,

        "&:focus": {
          borderColor: _fashion.focus.border,
          backgroundColor: _fashion.focus.main,
          color: _fashion.focus.contrast,
        },

        "&:hover": {
          borderColor: _fashion.hover.border,
          backgroundColor: _fashion.hover.main,
          color: _fashion.hover.contrast,
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
  },
);

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
