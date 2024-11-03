import {
  ZDeviceValues,
  ZSizeFixed,
  ZSizeGap,
  ZSizeThickness,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { css, cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { useKeyboardActivate } from "@zthun/helpful-react";
import { KeyboardEvent, MouseEvent } from "react";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";
import { useCss } from "../theme/styled";

export interface IZBubble
  extends IZComponentStyle,
    IZComponentName,
    IZComponentWidth<ZSizeFixed, ZSizeFixed>,
    IZComponentHierarchy,
    IZComponentFashion {
  padding?: ZSizeGap;
  border?: ZSizeThickness;

  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

const WidthChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), "rem"),
};

export function ZBubble(props: IZBubble) {
  const device = useFashionDevice();
  const tailor = useFashionTailor();
  const { component } = useFashionTheme();
  const {
    children,
    className,
    name,
    border,
    fashion,
    padding,
    onClick,
    width,
  } = props;
  const active = !!onClick;
  const { onKey, tabIndex } = useKeyboardActivate(onClick);

  const picker = new ZColorPicker(firstDefined(component, fashion));
  const _width = new ZDeviceValues(width, ZSizeFixed.Medium);

  const _className = useCss(css`
    &.ZBubble-root {
      align-content: center;
      align-items: center;
      background: ${picker.idle.main};
      color: ${picker.idle.contrast};
      cursor: ${active ? "pointer" : "default"};
      border-width: ${tailor.thickness(border)};
      border-style: solid;
      border-color: ${picker.idle.border};
      border-radius: 50%;
      clip-path: circle();
      display: flex;
      flex-direction: column;
      height: ${WidthChart[_width.xl]};
      justify-content: center;
      padding: ${tailor.gap(padding)};
      width: ${WidthChart[_width.xl]};
    }

    &.ZBubble-root:focus {
      background: ${active ? picker.focus.main : picker.idle.main};
      border-color: ${active ? picker.focus.border : picker.idle.border};
      color: ${active ? picker.focus.contrast : picker.idle.contrast};
      outline: "none";
    }

    &.ZBubble-root:hover {
      background: ${active ? picker.hover.main : picker.idle.main};
      border-color: ${active ? picker.hover.border : picker.idle.border};
      color: ${active ? picker.hover.contrast : picker.idle.contrast};
    }

    ${device.break(ZSizeFixed.Large)} {
      &.ZBubble-root {
        height: ${WidthChart[_width.lg]};
        width: ${WidthChart[_width.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      &.ZBubble-root {
        height: ${WidthChart[_width.md]};
        width: ${WidthChart[_width.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      &.ZBubble-root {
        height: ${WidthChart[_width.sm]};
        width: ${WidthChart[_width.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      &.ZBubble-root {
        height: ${WidthChart[_width.xs]};
        width: ${WidthChart[_width.xs]};
      }
    }
  `);

  return (
    <div
      className={cssJoinDefined("ZBubble-root", className, _className)}
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
