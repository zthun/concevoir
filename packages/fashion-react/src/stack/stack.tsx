import { Stack } from '@mui/material';
import { IZComponentHierarchy, IZComponentName, IZComponentOrientation } from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVoid, createSizeChartFixedArithmetic, createSizeChartVoidZero } from '@zthun/fashion-tailor';
import { ZOrientation, cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React, { ReactNode } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';

/**
 * Represents a stack component.
 */
interface IZStack extends IZComponentHierarchy<ReactNode>, IZComponentStyle, IZComponentName, IZComponentOrientation {
  alignItems?: Property.AlignItems;
  gap?: ZSizeFixed | ZSizeVoid;
  justifyContent?: Property.JustifyContent;
  inline?: boolean;
}

const GapChart = {
  ...createSizeChartFixedArithmetic(1, 1),
  ...createSizeChartVoidZero()
};

export function ZStack(props: IZStack) {
  const { className, alignItems, justifyContent, gap, name, orientation, children, inline } = props;
  const _gap = firstDefined(ZSizeVoid.None, gap);
  const direction = orientation === ZOrientation.Horizontal ? 'row' : 'column';
  const spacing = GapChart[_gap];

  return (
    <Stack
      className={cssJoinDefined('ZStack-root', className)}
      alignItems={alignItems}
      justifyContent={justifyContent}
      spacing={spacing}
      sx={{ display: inline ? 'inline-flex' : 'flex' }}
      direction={direction}
      data-orientation={orientation}
      data-name={name}
      data-inline={inline}
    >
      {children}
    </Stack>
  );
}
