import { LinearProgress } from '@mui/material';
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  ZSizeFixed,
  ZSizeVaried
} from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import React from 'react';
import { createStyleHook } from '../theme/styled';
import { IZSuspense } from './suspense';

const SuspenseProgressSizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(0.25, 0.25), 'rem');

const useSuspenseProgressStyles = createStyleHook((_, props: IZSuspense<ZSizeVaried.Full, ZSizeFixed>) => {
  const { height = ZSizeFixed.ExtraSmall, fashion } = props;
  const _height = SuspenseProgressSizeChart[height];
  const color = firstDefined('inherit', fashion?.main);

  return {
    root: {
      height: _height,
      color
    }
  };
});

/**
 * Renders a circular progress that can render nothing or the material ui circular progress.
 *
 * @param props -
 *        The properties for the card.
 *
 * @returns The jsx for a circular loading progress.
 */
export function ZSuspenseProgress(props: IZSuspense<ZSizeVaried.Full, ZSizeFixed>) {
  const { className, loading = true, height = ZSizeFixed.ExtraSmall, name } = props;
  const { classes } = useSuspenseProgressStyles(props);

  if (!loading) {
    return null;
  }

  return (
    <LinearProgress
      className={cssJoinDefined('ZSuspense-root', 'ZSuspense-progress', className, classes.root)}
      color='inherit'
      data-name={name}
      data-width={ZSizeVaried.Full}
      data-height={height}
    />
  );
}
