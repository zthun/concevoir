import { AppBar } from '@mui/material';
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss,
  IZFashionCoordination,
  ZSizeFixed,
  ZSizeVaried
} from '@zthun/fashion-designer';
import { cssJoinDefined } from '@zthun/helpful-fn';
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
  const { fashion = primary, height = ZSizeVaried.Fit } = props;

  const _height = heightChart[height];

  return {
    banner: {
      backgroundColor: theme.colorify(fashion.main),
      color: theme.colorify(fashion.contrast),
      height: _height
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
