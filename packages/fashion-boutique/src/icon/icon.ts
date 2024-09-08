import {
  ZDeviceValues,
  ZSizeFixed,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
} from "@zthun/fashion-tailor";
import { KeyboardEvent, MouseEvent, ReactNode, useEffect } from "react";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import { createStyleHook } from "../theme/styled";

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

export const useIconStyles = createStyleHook(
  ({ theme, device }, props: IZIcon) => {
    const { primary } = theme;
    const { width = ZSizeFixed.Small, fashion, onClick } = props;
    const _width = new ZDeviceValues(width, ZSizeFixed.Small);

    const fontSize = {
      fontSize: `${IconSizeChart[_width.xl]} !important`,

      [device.break(ZSizeFixed.Large)]: {
        fontSize: `${IconSizeChart[_width.lg]} !important`,
      },

      [device.break(ZSizeFixed.Medium)]: {
        fontSize: `${IconSizeChart[_width.md]} !important`,
      },

      [device.break(ZSizeFixed.Small)]: {
        fontSize: `${IconSizeChart[_width.sm]} !important`,
      },

      [device.break(ZSizeFixed.ExtraSmall)]: {
        fontSize: `${IconSizeChart[_width.xs]} !important`,
      },
    };

    return {
      root: {
        ...fontSize,
        color: fashion?.idle.main,
        cursor: onClick ? "pointer" : "inherit",

        "&:hover": {
          color: onClick ? primary.idle.main : undefined,
        },
      },
    };
  },
);

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
