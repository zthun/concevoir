import { css } from "@emotion/css";
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHeight } from "../component/component-height.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionDevice, useFashionTheme } from "../theme/fashion.mjs";

export interface IZBanner
  extends IZComponentHierarchy,
    IZComponentFashion,
    IZComponentHeight<ZSizeFixed | ZSizeVaried.Fit>,
    IZComponentStyle {}

const HeightChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), "rem"),
  ...createSizeChartVariedCss(),
};

const useBannerStyles = (props: IZBanner) => {
  const { primary } = useFashionTheme();
  const device = useFashionDevice();
  const { fashion = primary, height = ZSizeVaried.Fit } = props;
  const picker = new ZColorPicker(fashion);
  const _height = new ZDeviceValues(height);

  return css`
    &.ZBanner-root {
      background: ${picker.idle.main};
      box-sizing: border-box;
      color: ${picker.idle.contrast};
      display: block;
      position: sticky;
      width: 100%;
      z-index: 1100;

      left: auto;
      right: 0;
      top: 0;

      height: ${HeightChart[_height.xl]};
    }

    ${device.break(ZSizeFixed.Large)} {
      :host {
        height: ${HeightChart[_height.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      :host {
        height: ${HeightChart[_height.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      :host {
        height: ${HeightChart[_height.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      :host {
        height: ${HeightChart[_height.xs]};
      }
    }
  `;
};

export function ZBanner(props: IZBanner) {
  const { children, className } = props;
  const _className = useBannerStyles(props);

  return (
    <div className={cssJoinDefined("ZBanner-root", className, _className)}>
      {children}
    </div>
  );
}
