import { createSizeChartVariedCss, ZSizeFixed, ZSizeVaried, ZSizeVoid } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentHeight } from '../component/component-height.mjs';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZComponentWidth } from '../component/component-width.mjs';
import { createStyleHook } from '../theme/styled';

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
    widthLg = width,
    widthMd = widthLg,
    widthSm = widthMd,
    widthXs = widthSm,
    height = ZSizeVaried.Fit,
    heightLg = height,
    heightMd = heightLg,
    heightSm = heightMd,
    heightXs = heightSm
  } = props;

  const dimensions = {
    gridTemplateColumns: columns,
    height: GridDimensionChart[height],
    width: GridDimensionChart[width],

    [device.break(ZSizeFixed.Large)]: {
      gridTemplateColumns: columnsLg,
      height: GridDimensionChart[heightLg],
      width: GridDimensionChart[widthLg]
    },

    [device.break(ZSizeFixed.Medium)]: {
      gridTemplateColumns: columnsMd,
      height: GridDimensionChart[heightMd],
      width: GridDimensionChart[widthMd]
    },

    [device.break(ZSizeFixed.Small)]: {
      gridTemplateColumns: columnsSm,
      height: GridDimensionChart[heightSm],
      width: GridDimensionChart[widthSm]
    },

    [device.break(ZSizeFixed.ExtraSmall)]: {
      gridTemplateColumns: columnsXs,
      height: GridDimensionChart[heightXs],
      width: GridDimensionChart[widthXs]
    }
  };

  return {
    grid: {
      ...dimensions,
      display: 'grid',
      gridTemplateRows: rows,
      gap: tailor.gap(gap),
      alignItems,
      justifyItems,
      alignContent,
      justifyContent
    }
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
  return <div className={cssJoinDefined('ZGrid-root', className, classes.grid)}>{children}</div>;
}
