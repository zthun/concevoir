import { ZSizeFixed } from '@zthun/fashion-tailor';
import { firstDefined } from '@zthun/helpful-fn';
import { IZDataRequest, IZFilter, IZSort, ZDataRequestBuilder } from '@zthun/helpful-query';
import { useAmbassadorState } from '@zthun/helpful-react';
import { first, identity } from 'lodash';
import React, { useMemo } from 'react';
import { ZBox } from '../box/box';
import { ZChoiceDropDown } from '../choice/choice-drop-down';
import { IZComponentValue } from '../component/component-value';
import { ZStack } from '../stack/stack';
import { ZH2 } from '../typography/typography';
import { ZFilterEditor } from './filter-editor';
import { ZSortEditor } from './sort-editor';

export interface IZRequestEditor extends IZComponentValue<IZDataRequest> {
  pageSizes?: number[];
}

export const ZPageSizesOfTen = [10, 20, 50, 100];
export const ZPageSizesOfTwelve = [12, 24, 48, 96];

export function ZRequestEditor(props: IZRequestEditor) {
  const { value, onValueChange, pageSizes = ZPageSizesOfTen } = props;
  const defaultPageSize = useMemo(() => pageSizes[0] || ZPageSizesOfTen[0], [pageSizes]);
  const [_value, _setValue] = useAmbassadorState(
    value,
    onValueChange,
    new ZDataRequestBuilder().page(1).size(defaultPageSize).build()
  );

  const _size = useMemo(() => [_value.size], [_value.size]);

  const handlePageSizeChange = (sizes: number[]) => {
    const size = firstDefined(defaultPageSize, first(sizes));
    const next = new ZDataRequestBuilder().copy(_value).size(size).build();
    _setValue(next);
  };

  const handleSortChange = (sort: IZSort[]) => {
    const next = new ZDataRequestBuilder().copy(_value).sort(sort).build();
    _setValue(next);
  };

  const handleFilterChange = (filter: IZFilter) => {
    const next = new ZDataRequestBuilder().copy(_value).filter(filter).build();
    _setValue(next);
  };

  return (
    <ZBox padding={ZSizeFixed.Medium}>
      <ZStack gap={ZSizeFixed.Medium}>
        <ZH2>View</ZH2>
        <ZChoiceDropDown
          options={pageSizes}
          value={_size}
          onValueChange={handlePageSizeChange}
          indelible
          label='Items Per Page'
          identifier={identity}
        />
        <ZSortEditor value={_value.sort} onValueChange={handleSortChange} />
        <ZFilterEditor value={_value.filter} onValueChange={handleFilterChange} />
      </ZStack>
    </ZBox>
  );
}
