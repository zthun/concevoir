import { createSizeChartVariedCss, ZSizeFixed, ZSizeVaried, ZSizeVoid } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentHeight } from '../component/component-height';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { makeStyles } from '../theme/theme';

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

const useGridStyles = makeStyles<IZGrid>()((theme, props) => {
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
    height = ZSizeVaried.Fit
  } = props;

  return {
    grid: {
      display: 'grid',
      gridTemplateColumns: columns,
      gridTemplateRows: rows,
      gap: theme.gap(gap),
      alignItems,
      alignContent,
      justifyContent,
      height: GridHeightChart[height],

      [theme.breakpoints.down(ZSizeFixed.Large)]: {
        gridTemplateColumns: columnsLg
      },

      [theme.breakpoints.down(ZSizeFixed.Medium)]: {
        gridTemplateColumns: columnsMd
      },

      [theme.breakpoints.down(ZSizeFixed.Small)]: {
        gridTemplateColumns: columnsSm
      },

      [theme.breakpoints.down(ZSizeFixed.ExtraSmall)]: {
        gridTemplateColumns: columnsXs
      }
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
