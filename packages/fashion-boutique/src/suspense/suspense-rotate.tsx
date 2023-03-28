import { CircularProgress } from '@mui/material';
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

const SuspenseRotateSizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem');

const useSuspenseRotateStyles = createStyleHook((_, props: IZSuspense) => {
  const { fashion } = props;

  const color = firstDefined('inherit', fashion?.main);
  return {
    root: { color }
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
export function ZSuspenseRotate(props: IZSuspense) {
  const { className, loading = true, name, width = ZSizeFixed.ExtraSmall } = props;
  const size = SuspenseRotateSizeChart[width];
  const { classes } = useSuspenseRotateStyles(props);

  if (!loading) {
    return null;
  }

  return (
    <CircularProgress
      className={cssJoinDefined('ZSuspense-root', 'ZSuspense-rotate', className, classes.root)}
      size={size}
      color='inherit'
      data-name={name}
      data-width={width}
      data-height={ZSizeVaried.Fit}
    />
  );
}
