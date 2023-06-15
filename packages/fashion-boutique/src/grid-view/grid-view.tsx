import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZHorizontalAnchor, ZOrientation, cssJoinDefined } from '@zthun/helpful-fn';
import { IZDataRequest, ZDataRequestBuilder, ZDataSourceStatic } from '@zthun/helpful-query';
import { isStateErrored, isStateLoading, useAmbassadorState } from '@zthun/helpful-react';
import React, { ReactNode } from 'react';
import { ZBox } from '../box/box';
import { ZButton } from '../button/button';
import { IZComponentDataSource } from '../component/component-data-source';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { ZDrawerButton } from '../drawer/drawer-button';
import { IZGrid, ZGrid } from '../grid/grid';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { ZPagination } from '../pagination/pagination';
import { usePageView } from '../pagination/use-page-view';
import { ZPageSizesOfTwelve, ZRequestEditor } from '../request-editor/request-editor';
import { ZStack } from '../stack/stack';
import { IZSuspense } from '../suspense/suspense';
import { ZSuspenseRotate } from '../suspense/suspense-rotate';
import { IZText } from '../text/text';
import { ZTextInput } from '../text/text-input';
import { useFashionTheme } from '../theme/fashion';
import { createStyleHook } from '../theme/styled';

const EmptyDataSource = new ZDataSourceStatic([]);

export interface IZGridView<T = any>
  extends IZComponentStyle,
    IZComponentDataSource<T>,
    IZComponentValue<IZDataRequest> {
  GridProps?: Omit<IZGrid, 'children'>;
  SuspenseProps?: Omit<IZSuspense, 'loading'>;
  SearchProps?: Omit<IZText, 'value' | 'onValueChange'>;

  renderItem: (item: T, index: number) => ReactNode;
  renderError?: (error: Error) => ReactNode;
}

const DefaultRequest = new ZDataRequestBuilder().size(ZPageSizesOfTwelve[0]).page(1).build();

const useGridViewStyles = createStyleHook(({ tailor }) => ({
  divider: {
    height: `100%`,
    opacity: 0.4,
    borderLeft: `${tailor.thickness()} solid`
  },

  navigation: {},

  subNavigation: {}
}));

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
  const { surface, primary, secondary } = useFashionTheme();
  const { classes } = useGridViewStyles();

  const renderState = () => {
    if (isStateLoading(view)) {
      return <ZSuspenseRotate {...SuspenseProps} className='ZGridView-loading' loading />;
    }

    if (isStateErrored(view)) {
      return <div className='ZGridView-error'>{view.message}</div>;
    }

    return view.map((item, index) => renderItem(item, index));
  };

  const handlePageChange = (page: number) => {
    const next = new ZDataRequestBuilder().copy(request).page(page).build();
    setRequest(next);
  };

  const handleSearch = (search: string) => {
    const next = new ZDataRequestBuilder().copy(request).search(search).build();
    setRequest(next);
  };

  const handleRequest = (request: IZDataRequest) => {
    setRequest(new ZDataRequestBuilder().copy(request).build());
  };

  return (
    <ZStack className={cssJoinDefined('ZGridView-root', className)} gap={ZSizeFixed.Small}>
      <ZBox fashion={surface} border={{ width: ZSizeFixed.ExtraSmall }} padding={ZSizeFixed.Small}>
        <ZGrid
          className={cssJoinDefined('ZGridView-navigation', classes.navigation)}
          columns='1fr auto'
          columnsSm='1fr'
          alignItems='center'
          gap={ZSizeFixed.Medium}
        >
          <ZTextInput
            className='ZGridView-search'
            label='Search'
            value={request.search}
            onValueChange={handleSearch}
            orientation={ZOrientation.Horizontal}
          />

          <ZGrid columns='1fr auto' gap={ZSizeFixed.Small} alignItems='center'>
            <ZPagination
              className='ZGridView-pagination'
              pages={pages}
              value={request.page}
              onValueChange={handlePageChange}
            />

            <ZStack orientation={ZOrientation.Horizontal}>
              <ZDrawerButton
                className='ZGridView-view'
                ButtonProps={{
                  outline: true,
                  borderless: true,
                  compact: true,
                  fashion: secondary
                }}
                DrawerProps={{
                  anchor: ZHorizontalAnchor.Right
                }}
                icon={<ZIconFontAwesome name='filter' width={ZSizeFixed.ExtraSmall} />}
              >
                <ZRequestEditor value={request} onValueChange={handleRequest} pageSizes={ZPageSizesOfTwelve} />
              </ZDrawerButton>
              <ZButton
                className='ZGridView-refresh'
                outline
                borderless
                compact
                label={<ZIconFontAwesome name='refresh' width={ZSizeFixed.ExtraSmall} />}
                onClick={handleRequest.bind(null, request)}
                fashion={primary}
              />
            </ZStack>
          </ZGrid>
        </ZGrid>
      </ZBox>
      <ZGrid {...GridProps}>{renderState()}</ZGrid>
    </ZStack>
  );
}
