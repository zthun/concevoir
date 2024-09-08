import {
  createSizeChartVariedCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
} from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { Property } from "csstype";
import { IZComponentHeight } from "../component/component-height.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import { createStyleHook } from "../theme/styled";

export interface IZGrid
  extends IZComponentStyle,
    IZComponentHierarchy,
    IZComponentHeight<ZSizeVaried>,
    IZComponentWidth<ZSizeVaried> {
  alignItems?: Property.AlignItems;
  justifyItems?: Property.JustifyItems;
  alignContent?: Property.AlignContent;
  justifyContent?: Property.JustifyContent;
  gap?: ZSizeFixed | ZSizeVoid;
  columns?: Property.GridTemplateColumns;
  columnsLg?: Property.GridTemplateColumns;
  columnsMd?: Property.GridTemplateColumns;
  columnsSm?: Property.GridTemplateColumns;
  columnsXs?: Property.GridTemplateColumns;
  rows?: Property.GridTemplateRows;
}

const GridDimensionChart = createSizeChartVariedCss();

const useGridStyles = createStyleHook(({ tailor, device }, props: IZGrid) => {
  const {
    alignItems,
    justifyItems,
    alignContent,
    justifyContent,
    gap = ZSizeVoid.None,
    columns,
    columnsLg = columns,
    columnsMd = columnsLg,
    columnsSm = columnsMd,
    columnsXs = columnsSm,
    rows,
    width = ZSizeVaried.Fit,
    height = ZSizeVaried.Fit,
  } = props;

  const _width = new ZDeviceValues(width);
  const _height = new ZDeviceValues(height);

  const dimensions = {
    gridTemplateColumns: columns,
    height: GridDimensionChart[_height.xl],
    width: GridDimensionChart[_width.xl],

    [device.break(ZSizeFixed.Large)]: {
      gridTemplateColumns: columnsLg,
      height: GridDimensionChart[_height.lg],
      width: GridDimensionChart[_width.lg],
    },

    [device.break(ZSizeFixed.Medium)]: {
      gridTemplateColumns: columnsMd,
      height: GridDimensionChart[_height.md],
      width: GridDimensionChart[_width.md],
    },

    [device.break(ZSizeFixed.Small)]: {
      gridTemplateColumns: columnsSm,
      height: GridDimensionChart[_height.sm],
      width: GridDimensionChart[_width.sm],
    },

    [device.break(ZSizeFixed.ExtraSmall)]: {
      gridTemplateColumns: columnsXs,
      height: GridDimensionChart[_height.xs],
      width: GridDimensionChart[_width.xs],
    },
  };

  return {
    grid: {
      ...dimensions,
      display: "grid",
      gridTemplateRows: rows,
      gap: tailor.gap(gap),
      alignItems,
      justifyItems,
      alignContent,
      justifyContent,
    },
  };
});

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
  const { className, children } = props;
  const { classes } = useGridStyles(props);
  return (
    <div className={cssJoinDefined("ZGrid-root", className, classes.grid)}>
      {children}
    </div>
  );
}
