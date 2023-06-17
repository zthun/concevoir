import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZDataRequest, ZDataRequestBuilder, ZDataSourceStatic } from '@zthun/helpful-query';
import { isStateErrored, isStateLoading, useAmbassadorState } from '@zthun/helpful-react';
import React, { ReactNode } from 'react';
import { ZSuspenseProgress } from 'src/suspense/suspense-progress';
import { IZComponentDataSource } from '../component/component-data-source';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { IZGrid, ZGrid } from '../grid/grid';
import { usePageView } from '../pagination/use-page-view';
import { ZPageSizesOfTwelve, ZRequestEditor } from '../request-editor/request-editor';
import { IZSuspense } from '../suspense/suspense';
import { IZText } from '../text/text';

const EmptyDataSource = new ZDataSourceStatic([]);

export interface IZGridView<T = any>
  extends IZComponentStyle,
    IZComponentDataSource<T>,
    IZComponentValue<IZDataRequest> {
  GridProps?: Omit<IZGrid, 'children'>;
  SuspenseProps?: Omit<IZSuspense, 'loading' | 'width' | 'height'>;
  SearchProps?: Omit<IZText, 'value' | 'onValueChange'>;

  renderItem: (item: T, index: number) => ReactNode;
  renderError?: (error: Error) => ReactNode;
}

const [DefaultPageSize] = ZPageSizesOfTwelve;
const DefaultRequest = new ZDataRequestBuilder().size(DefaultPageSize).page(1).build();

export function ZGridView<T = any>(props: IZGridView<T>) {
  const {
    GridProps,
    SuspenseProps,
    renderItem,
    dataSource: query = EmptyDataSource,
    className,
    value,
    onValueChange
  } = props;

  const [request, setRequest] = useAmbassadorState(value, onValueChange, DefaultRequest);
  const { view, pages } = usePageView(query, request);

  const renderState = () => {
    if (isStateLoading(view)) {
      return (
        <ZSuspenseProgress
          {...SuspenseProps}
          className='ZGridView-loading'
          loading
          width={ZSizeVaried.Full}
          height={ZSizeFixed.Medium}
        />
      );
    }

    if (isStateErrored(view)) {
      return <div className='ZGridView-error'>{view.message}</div>;
    }

    return <ZGrid {...GridProps}>{view.map((item, index) => renderItem(item, index))};</ZGrid>;
  };

  return (
    <ZRequestEditor
      className={cssJoinDefined('ZGridView-root', className)}
      value={request}
      onValueChange={setRequest}
      pageSizes={ZPageSizesOfTwelve}
      pages={pages}
    >
      {renderState()}
    </ZRequestEditor>
  );
}
