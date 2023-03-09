import { AppBar } from '@mui/material';
import { IZFashionCoordination } from '@zthun/fashion-chroma';
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss,
  ZSizeFixed,
  ZSizeVaried
} from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentHeight } from '../component/component-height';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { makeStyles } from '../theme/theme';

/**
 * Properties for the banner bar.
 */
export interface IZBanner
  extends IZComponentHierarchy,
    IZComponentFashion<IZFashionCoordination>,
    IZComponentHeight<ZSizeFixed | ZSizeVaried.Fit>,
    IZComponentStyle {
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}

const heightChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
  ...createSizeChartVariedCss()
};

const useBannerStyles = makeStyles<IZBanner>()((theme, props) => {
  const { primary } = theme.design();
  const { fashion, height } = props;

  const _height = firstDefined(ZSizeVaried.Fit, height);
  const __height = heightChart[_height];
  const _fashion = firstDefined(primary, fashion);

  return {
    banner: {
      backgroundColor: theme.colorify(_fashion.main),
      color: theme.colorify(_fashion.contrast),
      height: __height
    }
  };
});

/**
 * A colorful bar in a specific location.
 */
export function ZBanner(props: IZBanner) {
  const { children, className, position } = props;
  const { classes } = useBannerStyles(props);

  return (
    <AppBar className={cssJoinDefined('ZBanner-root', className, classes.banner)} position={position}>
      {children}
    </AppBar>
  );
}
