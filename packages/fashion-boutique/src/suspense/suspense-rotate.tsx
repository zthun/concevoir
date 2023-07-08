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
 * Renders a rotating circle suspense.
 *
 * @param props -
 *        The properties for the component.
 *
 * @returns The jsx for the suspense.
 */
export function ZSuspenseRotate(props: IZSuspense) {
  const { className, loading = true, name, width = ZSizeFixed.ExtraSmall, fashion } = props;
  const size = SuspenseRotateSizeChart[width];
  const { classes } = useSuspenseRotateStyles(props);
  const _fashion = firstDefined('Inherit', fashion?.name);

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
      data-fashion={_fashion}
    />
  );
}
