import { css } from "@emotion/css";
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import {
  cssJoinDefined,
  firstDefined,
  pickDataAttributes,
} from "@zthun/helpful-fn";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentFooter } from "../component/component-footer.mjs";
import { IZComponentHeight } from "../component/component-height.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import { IZContentTitle, ZContentTitle } from "../content-title/content-title";
import { ZStack } from "../stack/stack";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";

export interface IZCard
  extends IZComponentHierarchy,
    IZComponentFashion,
    IZComponentFooter,
    IZComponentStyle,
    IZComponentName,
    IZComponentWidth,
    IZComponentHeight {
  TitleProps?: Omit<IZContentTitle, "className">;
}

const WidthChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.5, 15), "rem"),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss(),
};

const HeightChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(5, 20), "rem"),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss(),
};

export function ZCard(props: IZCard) {
  const { surface } = useFashionTheme();
  const tailor = useFashionTailor();
  const device = useFashionDevice();
  const {
    className,
    children,
    footer,
    fashion,
    name,
    width,
    height,
    TitleProps,
  } = props;
  const _fashion = firstDefined(surface, fashion);
  const picker = new ZColorPicker(_fashion);
  const _width = new ZDeviceValues(width, ZSizeVaried.Fit);
  const _height = new ZDeviceValues(height, ZSizeVaried.Fit);

  const _className = css`
    & {
      background-color: ${surface.idle.main};
      box-shadow: 0 0.2rem 8pt #101010;
      color: ${surface.idle.contrast};
      max-width: ${WidthChart[_width.xl]};
      min-height: ${HeightChart[_height.xl]};
    }

    > .ZCard-header {
      background-color: ${picker.idle.main};
      color: ${picker.idle.contrast};
      padding: ${tailor.gap(ZSizeFixed.Small)};
    }

    > .ZCard-content {
      padding: ${tailor.gap(ZSizeFixed.Small)};
    }

    > .ZCard-footer {
      padding: ${tailor.gap(ZSizeFixed.Small)};
      padding-top: 0;
    }

    ${device.break(ZSizeFixed.Large)} {
      & {
        max-width: ${WidthChart[_width.lg]};
        min-height: ${HeightChart[_height.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      & {
        max-width: ${WidthChart[_width.md]};
        min-height: ${HeightChart[_height.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      & {
        max-width: ${WidthChart[_width.sm]};
        min-height: ${HeightChart[_height.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      & {
        max-width: ${WidthChart[_width.xs]};
        min-height: ${HeightChart[_height.xs]};
      }
    }
  `;

  return (
    <ZStack
      align={{ items: "stretch" }}
      className={cssJoinDefined("ZCard-root", className, _className)}
      name={name}
      gap={ZSizeFixed.Medium}
      {...pickDataAttributes(props)}
      data-fashion={_fashion.name}
    >
      <ZContentTitle {...TitleProps} className="ZCard-header" />

      <article style={{ flexGrow: 1 }} className="ZCard-content">
        {children}
      </article>

      {footer && <footer className="ZCard-footer">{footer}</footer>}
    </ZStack>
  );
}
