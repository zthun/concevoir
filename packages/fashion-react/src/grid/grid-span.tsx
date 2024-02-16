import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { createStyleHook } from '../theme/styled';

export interface IZGridSpan extends IZComponentHierarchy, IZComponentStyle {
  columnStart?: Property.GridColumnStart;
  columnStartLg?: Property.GridColumnStart;
  columnStartMd?: Property.GridColumnStart;
  columnStartSm?: Property.GridColumnStart;
  columnStartXs?: Property.GridColumnStart;

  columnEnd?: Property.GridColumnEnd;
  columnEndLg?: Property.GridColumnEnd;
  columnEndMd?: Property.GridColumnEnd;
  columnEndSm?: Property.GridColumnEnd;
  columnEndXs?: Property.GridColumnEnd;

  rowStart?: Property.GridRowStart;
  rowStartLg?: Property.GridRowStart;
  rowStartMd?: Property.GridRowStart;
  rowStartSm?: Property.GridRowStart;
  rowStartXs?: Property.GridRowStart;

  rowEnd?: Property.GridRowEnd;
  rowEndLg?: Property.GridRowEnd;
  rowEndMd?: Property.GridRowEnd;
  rowEndSm?: Property.GridRowEnd;
  rowEndXs?: Property.GridRowEnd;
}

const useGridSpanStyles = createStyleHook(({ device }, props: IZGridSpan) => {
  const {
    columnStart,
    columnStartLg = columnStart,
    columnStartMd = columnStartLg,
    columnStartSm = columnStartMd,
    columnStartXs = columnStartSm,

    columnEnd,
    columnEndLg = columnEnd,
    columnEndMd = columnEndLg,
    columnEndSm = columnEndMd,
    columnEndXs = columnEndSm,

    rowStart,
    rowStartLg = rowStart,
    rowStartMd = rowStartLg,
    rowStartSm = rowStartMd,
    rowStartXs = rowStartSm,

    rowEnd,
    rowEndLg = rowEnd,
    rowEndMd = rowEndLg,
    rowEndSm = rowEndMd,
    rowEndXs = rowEndSm
  } = props;

  return {
    root: {
      gridColumnStart: columnStart,
      gridColumnEnd: columnEnd,
      gridRowStart: rowStart,
      gridRowEnd: rowEnd,

      [device.break(ZSizeFixed.Large)]: {
        gridColumnStart: columnStartLg,
        gridColumnEnd: columnEndLg,
        gridRowStart: rowStartLg,
        gridRowEnd: rowEndLg
      },

      [device.break(ZSizeFixed.Medium)]: {
        gridColumnStart: columnStartMd,
        gridColumnEnd: columnEndMd,
        gridRowStart: rowStartMd,
        gridRowEnd: rowEndMd
      },

      [device.break(ZSizeFixed.Small)]: {
        gridColumnStart: columnStartSm,
        gridColumnEnd: columnEndSm,
        gridRowStart: rowStartSm,
        gridRowEnd: rowEndSm
      },

      [device.break(ZSizeFixed.ExtraSmall)]: {
        gridColumnStart: columnStartXs,
        gridColumnEnd: columnEndXs,
        gridRowStart: rowStartXs,
        gridRowEnd: rowEndXs
      }
    }
  };
});

export function ZGridSpan(props: IZGridSpan) {
  const { className, children } = props;
  const { classes } = useGridSpanStyles(props);

  return <div className={cssJoinDefined('ZGridSpan-root', className, classes.root)}>{children}</div>;
}
