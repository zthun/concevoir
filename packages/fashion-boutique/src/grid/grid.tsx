import {
  createSizeChartVariedCss,
  ZDeviceValue,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeGap,
  ZSizeVaried,
  ZSizeVoid,
} from "@zthun/fashion-tailor";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { Property } from "csstype";
import { IZComponentHeight } from "../component/component-height.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import { useFashionDevice, useFashionTailor } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled";

export interface IZGrid
  extends IZComponentStyle,
    IZComponentHierarchy,
    IZComponentHeight<ZSizeVaried>,
    IZComponentWidth<ZSizeVaried> {
  align?: { items?: Property.AlignItems; content?: Property.AlignContent };
  justify?: {
    items?: Property.JustifyItems;
    content?: Property.JustifyContent;
  };
  gap?: ZDeviceValue<ZSizeGap>;
  columns?: ZDeviceValue<Property.GridTemplateColumns>;
  rows?: Property.GridTemplateRows;
}

const DimensionChart = createSizeChartVariedCss();

/**
 * Represents a layout that lines up items using CSS Grid.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The JSX used to render this layout.
 */
export function ZGrid(props: IZGrid) {
  const tailor = useFashionTailor();
  const device = useFashionDevice();
  const {
    align,
    className,
    children,
    columns,
    gap,
    justify,
    rows,
    width,
    height,
  } = props;

  const _width = new ZDeviceValues(width, ZSizeVaried.Fit);
  const _height = new ZDeviceValues(height, ZSizeVaried.Fit);
  const _columns = new ZDeviceValues(columns, undefined);
  const _gap = new ZDeviceValues(gap, ZSizeVoid.None);

  const _className = useCss(css`
    &.ZGrid-root {
      align-content: ${align?.content};
      align-items: ${align?.items};
      display: grid;
      grid-template-rows: ${rows};
      justify-content: ${justify?.content};
      justify-items: ${justify?.items};

      gap: ${tailor.gap(_gap.xl)};
      grid-template-columns: ${_columns.xl};
      height: ${DimensionChart[_height.xl]};
      width: ${DimensionChart[_width.xl]};
    }

    ${device.break(ZSizeFixed.Large)} {
      &.ZGrid-root {
        gap: ${tailor.gap(_gap.lg)};
        grid-template-columns: ${_columns.lg};
        height: ${DimensionChart[_height.lg]};
        width: ${DimensionChart[_width.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      &.ZGrid-root {
        gap: ${tailor.gap(_gap.md)};
        grid-template-columns: ${_columns.md};
        height: ${DimensionChart[_height.md]};
        width: ${DimensionChart[_width.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      &.ZGrid-root {
        gap: ${tailor.gap(_gap.sm)};
        grid-template-columns: ${_columns.sm};
        height: ${DimensionChart[_height.sm]};
        width: ${DimensionChart[_width.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      &.ZGrid-root {
        gap: ${tailor.gap(_gap.xs)};
        grid-template-columns: ${_columns.xs};
        height: ${DimensionChart[_height.xs]};
        width: ${DimensionChart[_width.xs]};
      }
    }
  `);

  return (
    <div className={cssJoinDefined("ZGrid-root", className, _className)}>
      {children}
    </div>
  );
}
