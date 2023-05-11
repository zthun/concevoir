import { cssJoinDefined } from '@zthun/helpful-fn';
import { ZDataRequestBuilder, ZDataSourceStatic } from '@zthun/helpful-query';
import { isStateErrored, isStateLoading, useAsyncState } from '@zthun/helpful-react';
import React, { ReactNode, useState } from 'react';
import { IZComponentDataSource } from '../component/component-data-source';
import { IZComponentStyle } from '../component/component-style';
import { IZGrid, ZGrid } from '../grid/grid';
import { IZSuspense } from '../suspense/suspense';
import { ZSuspenseRotate } from '../suspense/suspense-rotate';
import { IZText } from '../text/text';

const EmptyDataSource = new ZDataSourceStatic([]);

export interface IZGridView<T = any> extends IZComponentStyle, IZComponentDataSource<T> {
  GridProps?: Omit<IZGrid, 'children'>;
  SuspenseProps?: Omit<IZSuspense, 'loading'>;
  SearchProps?: Omit<IZText, 'value' | 'onValueChange'>;

  renderItem: (item: T, index: number) => ReactNode;
  renderError?: (error: Error) => ReactNode;
}

export function ZGridView<T = any>(props: IZGridView<T>) {
  const { GridProps, SuspenseProps, renderItem, dataSource: query = EmptyDataSource, className } = props;
  const [request] = useState(new ZDataRequestBuilder().build());
  const [view] = useAsyncState(() => query.retrieve(request), [request, query]);
  // /const [count] = useAsyncState(() => source.count(request), [request, source]);

  const renderState = () => {
    if (isStateLoading(view)) {
      return <ZSuspenseRotate {...SuspenseProps} className='ZGridView-loading' loading />;
    }

    if (isStateErrored(view)) {
      return <div className='ZGridView-error'>{view.message}</div>;
    }

    return view.map((item, index) => renderItem(item, index));
  };

  return (
    <div className={cssJoinDefined('ZGridView-root', className)}>
      <ZGrid {...GridProps}>{renderState()}</ZGrid>
    </div>
  );
}
