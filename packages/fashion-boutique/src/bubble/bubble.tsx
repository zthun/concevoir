import { ZSizeFixed, ZSizeVoid, createSizeChartFixedCss, createSizeChartFixedGeometric } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { createStyleHook } from '../theme/styled';

export interface IZBubble
  extends IZComponentStyle,
    IZComponentName,
    IZComponentWidth<ZSizeFixed>,
    IZComponentHierarchy,
    IZComponentFashion {
  padding?: ZSizeFixed | ZSizeVoid;
  border?: ZSizeFixed | ZSizeVoid;
}

const BubbleSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem')
};

const useBubbleStyles = createStyleHook(({ theme, tailor }, props: IZBubble) => {
  const {
    border = ZSizeVoid.None,
    width = ZSizeFixed.Medium,
    fashion = theme.component,
    padding = ZSizeVoid.None
  } = props;
  const size = BubbleSizeChart[width];

  return {
    root: {
      alignContent: 'center',
      alignItems: 'center',
      background: fashion.main,
      border: `${tailor.thickness(border)} solid ${fashion.border}`,
      borderRadius: '50%',
      clipPath: `circle()`,
      display: 'flex',
      flexDirection: 'column',
      height: size,
      justifyContent: 'center',
      padding: tailor.gap(padding),
      width: size
    }
  };
});

export function ZBubble(props: IZBubble) {
  const { children, className, name } = props;
  const { classes } = useBubbleStyles(props);

  return (
    <div className={cssJoinDefined('ZBubble-root', className, classes.root)} data-name={name}>
      {children}
    </div>
  );
}
