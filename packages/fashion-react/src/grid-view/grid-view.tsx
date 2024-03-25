import { IZComponentHeight, IZComponentWidth } from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { ZFashionPriority, ZFashionSeverity } from '@zthun/fashion-theme';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZDataRequest, ZDataRequestBuilder, ZDataSourceStatic } from '@zthun/helpful-query';
import { isStateErrored, isStateLoading, useAmbassadorState, useMoreViewState } from '@zthun/helpful-react';
import React, { ReactNode } from 'react';
import { ZAlert } from '../alert/alert';
import { IZButton, ZButton } from '../button/button';
import { IZComponentDataSource } from '../component/component-data-source.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZComponentValue } from '../component/component-value.mjs';
import { IZGrid, ZGrid } from '../grid/grid';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { ZStack } from '../stack/stack';
import { ZSuspenseProgress } from '../suspense/suspense-progress';
import { IZSuspense } from '../suspense/suspense.mjs';
import { IZText } from '../text/text';
import { ZTextInput } from '../text/text-input';
import { ZH5 } from '../typography/heading';

export interface IZGridView<T = any>
  extends IZComponentStyle,
    IZComponentDataSource<T>,
    IZComponentValue<IZDataRequest> {
  GridProps?: Omit<IZGrid, 'children'>;
  SuspenseProps?: Omit<IZSuspense, 'loading' | keyof IZComponentWidth | keyof IZComponentHeight>;
  SearchProps?: Omit<IZText, 'value' | 'onValueChange'>;
  MoreProps?: Omit<IZButton, 'onClick' | 'name'>;

  renderItem: (item: T, index: number) => ReactNode;
  renderError?: (error: Error) => ReactNode;
}

const EmptyDataSource = new ZDataSourceStatic([]);
const DefaultPageSize = 12;
const DefaultRequest = new ZDataRequestBuilder().size(DefaultPageSize).page(1).build();

export function ZGridView<T = any>(props: IZGridView<T>) {
  const {
    GridProps,
    SuspenseProps,
    MoreProps,
    renderItem,
    dataSource = EmptyDataSource,
    className,
    value,
    onValueChange
  } = props;
  const [request, setRequest] = useAmbassadorState(value, onValueChange, DefaultRequest);
  const { view, last, complete, more } = useMoreViewState(dataSource, request);

  const handleSearch = (search: string) => {
    setRequest((r) => new ZDataRequestBuilder().copy(r).search(search).page(1).build());
  };

  const renderView = () => {
    return <ZGrid {...GridProps}>{view.map((item, index) => renderItem(item, index))}</ZGrid>;
  };

  const renderError = () => {
    if (!isStateErrored(last)) {
      return;
    }

    return (
      <ZAlert
        className={cssJoinDefined('ZGridView-error')}
        name='grid-error'
        message={last.message}
        fashion={ZFashionSeverity.Error}
        heading={<ZH5 compact>Error</ZH5>}
        avatar={<ZIconFontAwesome name='circle-exclamation' width={ZSizeFixed.Small} />}
      />
    );
  };

  const renderMore = () => {
    if (isStateLoading(last)) {
      return (
        <ZSuspenseProgress
          {...SuspenseProps}
          className='ZGridView-loading'
          loading
          width={ZSizeVaried.Full}
          height={ZSizeFixed.Medium}
          name='grid-loading'
        />
      );
    }

    if (complete) {
      return null;
    }

    return (
      <ZButton
        label='More...'
        fashion={ZFashionPriority.Secondary}
        width={ZSizeVaried.Full}
        {...MoreProps}
        className={cssJoinDefined('ZGridView-more', MoreProps?.className)}
        onClick={more}
        name='grid-more'
      />
    );
  };

  return (
    <ZStack className={cssJoinDefined('ZGridView-root', className)} gap={ZSizeFixed.Medium}>
      <ZTextInput
        className='ZGridView-search'
        label='Search'
        value={request.search}
        onValueChange={handleSearch}
        name='search'
      />
      {renderView()}
      {renderError()}
      {renderMore()}
    </ZStack>
  );
}
