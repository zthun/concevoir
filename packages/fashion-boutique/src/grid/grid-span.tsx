import { cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { createStyleHook } from '../theme/styled';

export interface IZGridSpan extends IZComponentHierarchy, IZComponentStyle {
  columnStart?: Property.GridColumnStart;
  columnEnd?: Property.GridColumnEnd;
  rowStart?: Property.GridRowStart;
  rowEnd?: Property.GridRowEnd;
}

const useGridSpanStyles = createStyleHook((_, props: IZGridSpan) => {
  const { columnStart, columnEnd, rowStart, rowEnd } = props;

  return {
    root: {
      gridColumnStart: columnStart,
      gridColumnEnd: columnEnd,
      gridRowStart: rowStart,
      gridRowEnd: rowEnd
    }
  };
});

export function ZGridSpan(props: IZGridSpan) {
  const { className, children } = props;
  const { classes } = useGridSpanStyles(props);

  return <div className={cssJoinDefined('ZGridSpan-root', className, classes.root)}>{children}</div>;
}
