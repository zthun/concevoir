import { Stack } from '@mui/material';
import { createSizeChartFixedArithmetic, createSizeChartVoidZero, ZSizeFixed, ZSizeVoid } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';

/**
 * Represents a stack component.
 */
interface IZStack extends IZComponentHierarchy, IZComponentStyle {
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  gap?: ZSizeFixed | ZSizeVoid;
  orientation?: 'horizontal' | 'vertical';
}

const GapChart = {
  ...createSizeChartFixedArithmetic(1, 1),
  ...createSizeChartVoidZero()
};

export function ZStack(props: IZStack) {
  const { className, alignItems, justifyContent, gap, orientation, children } = props;
  const _gap = firstDefined(ZSizeVoid.None, gap);
  const direction = orientation === 'horizontal' ? 'row' : 'column';
  const spacing = GapChart[_gap];

  return (
    <Stack
      className={cssJoinDefined('ZStack-root', className)}
      alignItems={alignItems}
      justifyContent={justifyContent}
      spacing={spacing}
      direction={direction}
      data-orientation={orientation}
    >
      {children}
    </Stack>
  );
}
