import { TableCell, TableRow } from '@mui/material';
import { ZSizeFixed, createSizeChartFixedArithmetic } from '@zthun/fashion-tailor';
import { ZOrientation, cssJoinDefined } from '@zthun/helpful-fn';
import {
  IZDataRequest,
  IZMetadata,
  IZSorter,
  ZDataRequestBuilder,
  ZDataSourceStatic,
  ZSortDirection,
  ZSorterSingle
} from '@zthun/helpful-query';
import { useAmbassadorState } from '@zthun/helpful-react';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import { IZComponentDataSource } from '../component/component-data-source';
import { IZComponentHeight } from '../component/component-height';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { useConcatView } from '../pagination/use-concat-view';
import { ZStack } from '../stack/stack';
import { useTableComponents } from './use-table-components';
import { useTableStyles } from './use-table-styles';

const EmptyDataSource = new ZDataSourceStatic([]);
const DefaultDataRequest = new ZDataRequestBuilder().size(1000).build();

export interface IZTable<T = any>
  extends IZComponentStyle,
    IZComponentDataSource<T>,
    IZComponentValue<IZDataRequest>,
    IZComponentHeight<ZSizeFixed> {
  columns: IZMetadata[];

  sorter?: IZSorter;

  identifier: (r: T) => string | number;
}

const TableSizeChart = createSizeChartFixedArithmetic(150, 150);

export function ZTable<T = any>(props: IZTable<T>) {
  const {
    className,
    dataSource = EmptyDataSource,
    columns,
    height = ZSizeFixed.Medium,
    value,
    onValueChange,
    identifier,
    sorter
  } = props;
  const { classes } = useTableStyles();

  const [request, setRequest] = useAmbassadorState(value, onValueChange, DefaultDataRequest);
  const _sorter = useMemo(() => sorter || new ZSorterSingle(request.sort), [request.sort]);

  const { view, next } = useConcatView(dataSource, request);

  const TableComponents = useTableComponents<T>();

  const handleSort = (c: IZMetadata) => {
    if (!c.sortable) {
      return;
    }

    const next = _sorter.sort(c.path);
    setRequest((r) => new ZDataRequestBuilder().copy(r).sort(next).build());
  };

  const renderSort = (c: IZMetadata) => {
    if (!c.path) {
      return null;
    }

    const dir = _sorter.sorted(c.path);

    if (!dir) {
      return null;
    }

    const direction = dir === ZSortDirection.Ascending ? 'arrow-up' : 'arrow-down';

    return (
      <ZIconFontAwesome
        className={cssJoinDefined('ZTable-cell-sort', classes.sort)}
        name={direction}
        width={ZSizeFixed.ExtraSmall}
        data-direction={dir}
      />
    );
  };

  const renderHead = () => (
    <TableRow data-row={'header'}>
      {columns.map((c) => (
        <TableCell
          key={c.id}
          className={cssJoinDefined('ZTable-cell-header', classes.header, [classes.headerSort, !!c.sortable])}
          onClick={handleSort.bind(null, c)}
          data-column={c.id}
          data-row='header'
        >
          <ZStack orientation={ZOrientation.Horizontal} alignItems='center'>
            <span className={cssJoinDefined('ZTable-cell-header-name', classes.text)}>{c.name}</span>
            {renderSort(c)}
          </ZStack>
        </TableCell>
      ))}
    </TableRow>
  );

  const renderValue = (r: T, c: IZMetadata) => {
    return get(r, c.path!);
  };

  const renderItem = (ri: number, r: T) => {
    const _identifier = identifier(r);
    const key = (c: IZMetadata) => `${_identifier}-${c.id}`;

    return (
      <>
        {columns.map((c, ci) => (
          <TableCell
            key={key(c)}
            className={cssJoinDefined('ZTable-cell', classes.cell, classes.text)}
            data-row={_identifier}
            data-column={c.id}
            data-row-index={ri}
            data-column-index={ci}
          >
            {renderValue(r, c)}
          </TableCell>
        ))}
      </>
    );
  };

  const _height = TableSizeChart[height];

  return (
    <TableVirtuoso
      className={cssJoinDefined('ZTable-root', className, classes.root)}
      style={{ height: _height }}
      data={view}
      endReached={() => next()}
      itemContent={renderItem}
      components={TableComponents}
      fixedHeaderContent={renderHead}
    />
  );
}
