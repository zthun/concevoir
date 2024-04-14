import { IZComponentHierarchy } from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZDeviceValue, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { mapValues } from 'lodash-es';
import React, { ReactNode } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZGrid, ZGrid } from './grid';
import { ZGridSpan } from './grid-span';

export type ZNewspaperColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ZNewspaperRange = [ZNewspaperColumn, ZNewspaperColumn];

export interface IZNewspaper extends IZComponentStyle, IZComponentHierarchy<ReactNode> {
  GridProps?: Omit<IZGrid, 'columns' | 'children' | 'className' | 'width'>;
  range?: ZDeviceValue<ZNewspaperRange>;
}

export function ZNewspaper(props: IZNewspaper) {
  const { GridProps, className, range, children } = props;

  const $range = new ZDeviceBounds<ZNewspaperRange>(range, [1, 12]).toDeviceMap();

  const columnStart = mapValues($range, (r) => r[0]);
  const columnEnd = mapValues($range, (r) => r[1] + 1);

  return (
    <ZGrid
      {...GridProps}
      className={cssJoinDefined('ZNewspaper-root', className)}
      columns='1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
      width={ZSizeVaried.Full}
    >
      <ZGridSpan columnStart={columnStart} columnEnd={columnEnd}>
        {children}
      </ZGridSpan>
    </ZGrid>
  );
}
