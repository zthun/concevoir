import { createSizeChartVariedCss, ZSizeFixed, ZSizeVaried, ZSizeVoid } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentHeight } from '../component/component-height';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { createStyleHook } from '../theme/styled';

export interface IZGrid extends IZComponentStyle, IZComponentHierarchy, IZComponentHeight<ZSizeVaried> {
  alignItems?: Property.AlignItems;
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

const GridHeightChart = createSizeChartVariedCss();

const useGridStyles = createStyleHook(({ tailor, device }, props: IZGrid) => {
  const {
    alignItems,
    alignContent,
    justifyContent,
    gap = ZSizeVoid.None,
    columns,
    columnsLg = columns,
    columnsMd = columnsLg,
    columnsSm = columnsMd,
    columnsXs = columnsSm,
    rows,
    height = ZSizeVaried.Fit,
    heightLg = height,
    heightMd = heightLg,
    heightSm = heightMd,
    heightXs = heightSm
  } = props;

  const dimensions = {
    gridTemplateColumns: columns,
    height: GridHeightChart[height],

    [device.break(ZSizeFixed.Large)]: {
      gridTemplateColumns: columnsLg,
      height: GridHeightChart[heightLg]
    },

    [device.break(ZSizeFixed.Medium)]: {
      gridTemplateColumns: columnsMd,
      height: GridHeightChart[heightMd]
    },

    [device.break(ZSizeFixed.Small)]: {
      gridTemplateColumns: columnsSm,
      height: GridHeightChart[heightSm]
    },

    [device.break(ZSizeFixed.ExtraSmall)]: {
      gridTemplateColumns: columnsXs,
      height: GridHeightChart[heightXs]
    }
  };

  return {
    grid: {
      ...dimensions,
      display: 'grid',
      gridTemplateRows: rows,
      gap: tailor.gap(gap),
      alignItems,
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
