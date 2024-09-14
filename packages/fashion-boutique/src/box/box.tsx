import { css } from "@emotion/css";
import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeGap,
  ZSizeMargin,
  ZSizeRounding,
  ZSizeThickness,
  ZSizeVaried,
  ZSizeVoid,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import {
  cssJoinDefined,
  firstDefined,
  ZHorizontalAnchor,
  ZQuadrilateralBuilder,
  ZQuadrilateralCornersBuilder,
  ZQuadrilateralCornersLike,
  ZQuadrilateralLike,
} from "@zthun/helpful-fn";
import { Property } from "csstype";
import { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";

interface IZBorderProps {
  width?: ZQuadrilateralLike<ZSizeThickness>;
  style?: ZQuadrilateralLike<Property.BorderStyle>;
  radius?: ZQuadrilateralCornersLike<ZSizeRounding>;
}

const WidthChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), "rem"),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss(),
  [ZSizeVaried.Fit]: "fit-content",
};

export interface IZBox
  extends IZComponentHierarchy,
    IZComponentStyle,
    IZComponentWidth,
    IZComponentFashion,
    IZComponentDomEvents<HTMLElement> {
  border?: IZBorderProps;
  cursor?: Property.Cursor;
  interactive?: boolean;
  justification?: ZHorizontalAnchor;
  margin?: ZQuadrilateralLike<ZSizeMargin>;
  padding?: ZQuadrilateralLike<ZSizeGap>;
}

export function ZBox(props: IZBox) {
  const device = useFashionDevice();
  const tailor = useFashionTailor();
  const { transparent } = useFashionTheme();

  const {
    border,
    className,
    children,
    cursor,
    fashion,
    interactive,
    justification,
    margin,
    padding,
    width,
    ...events
  } = props;
  const tabIndex = interactive ? 0 : undefined;
  const picker = new ZColorPicker(firstDefined(transparent, fashion));
  const trim = new ZQuadrilateralBuilder<Property.BorderStyle>("solid")
    .from(border?.style)
    .build();
  const edge = new ZQuadrilateralBuilder<ZSizeThickness>(ZSizeVoid.None)
    .from(border?.width)
    .build();
  const radius = new ZQuadrilateralCornersBuilder<ZSizeRounding>(ZSizeVoid.None)
    .from(border?.radius)
    .build();
  const _padding = new ZQuadrilateralBuilder<ZSizeGap>(ZSizeVoid.None)
    .from(padding)
    .build();
  const _margin = new ZQuadrilateralBuilder<ZSizeMargin>(ZSizeVoid.None)
    .from(margin)
    .build();
  const _width = new ZDeviceValues(width, ZSizeVaried.Full);

  const _className = css`
    & {
      background-color: ${picker.idle.main};
      border-color: ${picker.idle.border};

      border-bottom-style: ${trim.bottom};
      border-left-style: ${trim.left};
      border-right-style: ${trim.right};
      border-top-style: ${trim.top};

      border-bottom-width: ${tailor.thickness(edge.bottom)};
      border-left-width: ${tailor.thickness(edge.left)};
      border-right-width: ${tailor.thickness(edge.right)};
      border-top-width: ${tailor.thickness(edge?.top)};

      border-bottom-left-radius: ${tailor.rounding(radius.bottomLeft)};
      border-bottom-right-radius: ${tailor.rounding(radius.bottomRight)};
      border-top-left-radius: ${tailor.rounding(radius.topLeft)};
      border-top-right-radius: ${tailor.rounding(radius.topRight)};

      display: block;
      color: ${picker.idle.contrast};
      cursor: ${cursor};

      padding-bottom: ${tailor.gap(_padding.bottom)};
      padding-left: ${tailor.gap(_padding.left)};
      padding-right: ${tailor.gap(_padding.right)};
      padding-top: ${tailor.gap(_padding.top)};

      margin-bottom: ${tailor.gap(_margin.bottom)};
      margin-left: ${tailor.gap(_margin.left)};
      margin-right: ${tailor.gap(_margin.right)};
      margin-top: ${tailor.gap(_margin.top)};

      max-width: ${WidthChart[_width.xl]};

      text-align: ${justification};
    }

    &:focus {
      background-color: ${interactive ? picker.focus.main : picker.idle.main};
      border-color: ${interactive ? picker.focus.border : picker.idle.border};
      color: ${interactive ? picker.focus.contrast : picker.idle.contrast};
    }

    &:hover {
      background-color: ${interactive ? picker.hover.main : picker.idle.main};
      border-color: ${interactive ? picker.hover.border : picker.idle.border};
      color: ${interactive ? picker.hover.contrast : picker.idle.contrast};
    }

    ${device.break(ZSizeFixed.Large)} {
      & {
        max-width: ${WidthChart[_width.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      & {
        max-width: ${WidthChart[_width.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      & {
        max-width: ${WidthChart[_width.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      & {
        max-width: ${WidthChart[_width.xs]};
      }
    }
  `;

  return (
    <div
      {...events}
      className={cssJoinDefined("ZBox-root", className, _className)}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
}
