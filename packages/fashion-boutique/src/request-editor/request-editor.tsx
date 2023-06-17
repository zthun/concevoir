import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZOrientation, cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { IZDataRequest, ZDataRequestBuilder } from '@zthun/helpful-query';
import { useAmbassadorState } from '@zthun/helpful-react';
import { first, identity } from 'lodash';
import React, { useMemo } from 'react';
import { ZButton } from '../button/button';
import { ZChoiceDropDown } from '../choice/choice-drop-down';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { ZGrid } from '../grid/grid';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { ZPagination } from '../pagination/pagination';
import { ZStack } from '../stack/stack';
import { ZTextInput } from '../text/text-input';
import { useFashionTheme } from '../theme/fashion';

export interface IZRequestEditor extends IZComponentValue<IZDataRequest>, IZComponentHierarchy, IZComponentStyle {
  pages: number;
  pageSizes?: number[];
}

export const ZPageSizesOfTen = [10, 20, 50, 100];
export const ZPageSizesOfTwelve = [12, 24, 48, 96];

export function ZRequestEditor(props: IZRequestEditor) {
  const { value, onValueChange, pageSizes = ZPageSizesOfTen, pages, children } = props;
  const [request, setRequest] = useAmbassadorState(value, onValueChange, new ZDataRequestBuilder().build());
  const { primary, secondary } = useFashionTheme();

  const _size = useMemo(() => (request.size == null ? [] : [request.size]), [request.size]);

  const handleSizeChange = (sizes: number[]) => {
    const [defaultPageSize] = pageSizes;
    const size = firstDefined(defaultPageSize, first(sizes));
    setRequest((r) => new ZDataRequestBuilder().copy(r).size(size).build());
  };

  /*
  const handleSortChange = (sort: IZSort[]) => {
    setRequest((r) => new ZDataRequestBuilder().copy(r).sort(sort).build());
  };

  const handleFilterChange = (filter: IZFilter) => {
    setRequest((r) => new ZDataRequestBuilder().copy(r).filter(filter).build());
  };
  */

  const handlePageChange = (page: number) => {
    setRequest((r) => new ZDataRequestBuilder().copy(r).page(page).build());
  };

  const handleSearch = (search: string) => {
    setRequest((r) => new ZDataRequestBuilder().copy(r).search(search).build());
  };

  const handleRefresh = () => {
    setRequest((r) => new ZDataRequestBuilder().copy(r).build());
  };

  return (
    <ZStack className={cssJoinDefined('ZRequestEditor-root')} gap={ZSizeFixed.Medium}>
      <ZGrid
        className={cssJoinDefined('ZRequestEditor-root')}
        columns='1fr auto'
        alignItems='center'
        gap={ZSizeFixed.Medium}
      >
        <ZTextInput
          className='ZRequestEditor-search'
          label='Search'
          value={request.search}
          onValueChange={handleSearch}
          orientation={ZOrientation.Horizontal}
        />

        <ZChoiceDropDown
          className='ZRequestEditor-page-size'
          options={pageSizes}
          value={_size}
          orientation={ZOrientation.Horizontal}
          onValueChange={handleSizeChange}
          indelible
          label='Size'
          name='request-editor-page-size'
          identifier={identity}
        />
      </ZGrid>
      <ZGrid columns='auto 1fr auto' alignItems='start' gap={ZSizeFixed.Small}>
        <ZPagination
          className='ZRequestEditor-pagination'
          pages={pages}
          value={request.page}
          orientation={ZOrientation.Vertical}
          onValueChange={handlePageChange}
        />
        <div className='ZRequestEditor-content'>{children}</div>
        <ZStack gap={ZSizeFixed.ExtraSmall} alignItems='center'>
          <ZButton
            className='ZRequestEditor-refresh'
            outline
            borderless
            compact
            label={<ZIconFontAwesome name='refresh' width={ZSizeFixed.ExtraSmall} />}
            onClick={handleRefresh}
            fashion={primary}
          />
          <ZButton
            className='ZRequestEditor-sort'
            outline
            borderless
            compact
            fashion={secondary}
            label={<ZIconFontAwesome name='sort' width={ZSizeFixed.ExtraSmall} />}
          />
          <ZButton
            className='ZRequestEditor-filter'
            outline
            borderless
            compact
            fashion={secondary}
            label={<ZIconFontAwesome name='filter' width={ZSizeFixed.ExtraSmall} />}
          />
        </ZStack>
      </ZGrid>
    </ZStack>
  );
}
