import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { ZOrientation, cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { IZDataRequest, ZDataRequestBuilder, ZDataSourceStatic } from '@zthun/helpful-query';
import { isStateErrored, isStateLoading, useAmbassadorState } from '@zthun/helpful-react';
import { first, identity } from 'lodash';
import React, { ReactNode, useMemo } from 'react';
import { ZAlert } from '../alert/alert';
import { ZButton } from '../button/button';
import { ZChoiceDropDown } from '../choice/choice-drop-down';
import { IZComponentDataSource } from '../component/component-data-source';
import { IZComponentHeight } from '../component/component-height';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { IZComponentWidth } from '../component/component-width';
import { IZGrid, ZGrid } from '../grid/grid';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { ZPagination } from '../pagination/pagination';
import { usePageView } from '../pagination/use-page-view';
import { ZStack } from '../stack/stack';
import { IZSuspense } from '../suspense/suspense';
import { ZSuspenseProgress } from '../suspense/suspense-progress';
import { IZText } from '../text/text';
import { ZTextInput } from '../text/text-input';
import { useFashionTheme } from '../theme/fashion';
import { ZH5 } from '../typography/typography';

export interface IZGridView<T = any>
  extends IZComponentStyle,
    IZComponentDataSource<T>,
    IZComponentValue<IZDataRequest> {
  GridProps?: Omit<IZGrid, 'children'>;
  SuspenseProps?: Omit<IZSuspense, 'loading' | keyof IZComponentWidth | keyof IZComponentHeight>;
  SearchProps?: Omit<IZText, 'value' | 'onValueChange'>;

  renderItem: (item: T, index: number) => ReactNode;
  renderError?: (error: Error) => ReactNode;
}

const ZPageSizesOfTwelve = [12, 24, 48, 96];
const EmptyDataSource = new ZDataSourceStatic([]);
const [DefaultPageSize] = ZPageSizesOfTwelve;
const DefaultRequest = new ZDataRequestBuilder().size(DefaultPageSize).page(1).build();

export function ZGridView<T = any>(props: IZGridView<T>) {
  const { GridProps, SuspenseProps, renderItem, dataSource = EmptyDataSource, className, value, onValueChange } = props;

  const [request, setRequest] = useAmbassadorState(value, onValueChange, DefaultRequest);
  const { view, pages } = usePageView(dataSource, request);
  const { secondary, error } = useFashionTheme();

  const _size = useMemo(() => (request.size == null ? [] : [request.size]), [request.size]);

  const handleSizeChange = (sizes: number[]) => {
    const size = firstDefined(DefaultPageSize, first(sizes));
    setRequest((r) => new ZDataRequestBuilder().copy(r).size(size).page(1).build());
  };

  const handlePageChange = (page: number) => {
    setRequest((r) => new ZDataRequestBuilder().copy(r).page(page).build());
  };

  const handleSearch = (search: string) => {
    setRequest((r) => new ZDataRequestBuilder().copy(r).search(search).page(1).build());
  };

  const handleRefresh = () => {
    setRequest((r) => new ZDataRequestBuilder().copy(r).build());
  };

  const renderState = () => {
    if (isStateLoading(view)) {
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

    if (isStateErrored(view)) {
      return (
        <ZAlert
          className={cssJoinDefined('ZGridView-error')}
          name='grid-error'
          message={view.message}
          fashion={error}
          heading={<ZH5 compact>Error</ZH5>}
          avatar={<ZIconFontAwesome name='circle-exclamation' width={ZSizeFixed.Small} />}
        />
      );
    }

    return <ZGrid {...GridProps}>{view.map((item, index) => renderItem(item, index))}</ZGrid>;
  };

  return (
    <ZStack className={cssJoinDefined('ZGridView-root', className)} gap={ZSizeFixed.Medium}>
      <ZGrid columns='1fr auto' alignItems='center' gap={ZSizeFixed.ExtraSmall}>
        <ZTextInput
          className='ZGridView-search'
          label='Search'
          value={request.search}
          onValueChange={handleSearch}
          name='search'
        />

        <ZChoiceDropDown
          className='ZGridView-page-size'
          options={ZPageSizesOfTwelve}
          value={_size}
          onValueChange={handleSizeChange}
          indelible
          label='Size'
          name='page-size'
          identifier={identity}
        />
      </ZGrid>
      <ZGrid columns='auto 1fr' alignItems='start' gap={ZSizeFixed.ExtraSmall}>
        <ZStack gap={ZSizeFixed.Medium}>
          <ZButton
            className='ZGridView-refresh'
            outline
            borderless
            compact
            label={<ZIconFontAwesome name='refresh' width={ZSizeFixed.ExtraSmall} />}
            onClick={handleRefresh}
            fashion={secondary}
            name='refresh'
          />

          <ZPagination
            className='ZGridView-pagination'
            pages={pages}
            value={request.page}
            orientation={ZOrientation.Vertical}
            onValueChange={handlePageChange}
          />
        </ZStack>

        {renderState()}
      </ZGrid>
    </ZStack>
  );
}
