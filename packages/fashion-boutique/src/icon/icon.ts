import { css } from "@emotion/css";
import {
  ZDeviceValues,
  ZSizeFixed,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { firstDefined } from "@zthun/helpful-fn";
import { KeyboardEvent, MouseEvent, ReactNode, useEffect } from "react";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import { useFashionDevice, useFashionTheme } from "../theme/fashion.mjs";

export interface IZIcon
  extends IZComponentName,
    IZComponentStyle,
    IZComponentWidth<ZSizeFixed>,
    IZComponentFashion {
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  tooltip?: ReactNode;
}

const IconSizeChart = createSizeChartFixedCss(
  createSizeChartFixedGeometric(2, 1),
  "rem",
);

export function useIconStyles(props: IZIcon) {
  const { inherit } = useFashionTheme();
  const device = useFashionDevice();
  const { width = ZSizeFixed.Small, fashion, onClick } = props;
  const _width = new ZDeviceValues(width, ZSizeFixed.Small);
  const picker = new ZColorPicker(firstDefined(inherit, fashion));

  return css`
    & {
      color: ${picker.idle.main};
      cursor: ${onClick ? "pointer" : "inherit"};
      font-size: ${IconSizeChart[_width.xl]};
    }

    &:hover {
      color: ${onClick ? picker.hover.main : undefined};
    }

    ${device.break(ZSizeFixed.Large)}: {
      & {
        font-size: ${IconSizeChart[_width.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)}: {
      & {
        font-size: ${IconSizeChart[_width.lg]};
      }
    }

    ${device.break(ZSizeFixed.Small)}: {
      & {
        font-size: ${IconSizeChart[_width.lg]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)}: {
      & {
        font-size: ${IconSizeChart[_width.lg]};
      }
    }
  `;
}

export function useIconProvider(provider: string) {
  const dom = document;

  useEffect(() => {
    const exists = dom.querySelector(`link[href="${provider}"]`);

    if (!exists) {
      const link = dom.createElement("link");
      link.rel = "stylesheet";
      link.href = provider;
      dom.head.appendChild(link);
    }
  }, []);
}
