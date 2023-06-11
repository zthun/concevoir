import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import {
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import {
  IZDataRequest,
  IZMetadata,
  IZSorter,
  ZDataRequestBuilder,
  ZDataSourceStatic,
  ZSortDirection,
  ZSorterSingle
} from '@zthun/helpful-query';
import { isStateErrored, isStateLoading, useAmbassadorState } from '@zthun/helpful-react';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { IZComponentDataSource } from '../component/component-data-source';
import { IZComponentHeight } from '../component/component-height';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { usePageView } from '../pagination/use-page-view';
import { ZSuspenseRotate } from '../suspense/suspense-rotate';
import { createStyleHook } from '../theme/styled';

const EmptyDataSource = new ZDataSourceStatic([]);
const DefaultDataRequest = new ZDataRequestBuilder().size(10).build();

export interface IZTable<T = any>
  extends IZComponentStyle,
    IZComponentDataSource<T>,
    IZComponentValue<IZDataRequest>,
    IZComponentHeight<ZSizeFixed | ZSizeVaried> {
  columns: IZMetadata[];

  sorter?: IZSorter;

  identifier: (r: T) => string | number;
}

const TableSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(20, 20), 'rem'),
  ...createSizeChartVariedCss()
};

const useTableStyles = createStyleHook(({ theme, tailor }, props: IZTable) => {
  const { height = ZSizeVaried.Full } = props;

  const _height = TableSizeChart[height];

  return {
    root: {
      height: _height,
      color: theme.opposite.main,
      width: '100%'
    },

    table: {
      tableLayout: 'fixed'
    },

    cell: {
      color: 'inherit',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },

    header: {
      backgroundColor: theme.primary.main,
      color: theme.primary.contrast
    },

    headerSort: {
      'cursor': 'pointer',

      '&:hover': {
        backgroundColor: theme.primary.light
      }
    },

    body: {
      overflow: 'auto'
    },

    sort: {
      marginLeft: tailor.gap(ZSizeFixed.ExtraSmall)
    },

    operations: {
      marginTop: tailor.gap()
    }
  };
});

export function ZTable<T = any>(props: IZTable<T>) {
  const { className, dataSource = EmptyDataSource, columns, value, onValueChange, identifier, sorter } = props;
  const { classes } = useTableStyles(props);

  const [request, setRequest] = useAmbassadorState(value, onValueChange, DefaultDataRequest);
  const _sorter = useMemo(() => sorter || new ZSorterSingle(request.sort), [request.sort]);

  const { view } = usePageView(dataSource, request);

  const handleSort = (c: IZMetadata) => {
    if (!c.sortable) {
      return;
    }

    const next = _sorter.sort(c.path);
    setRequest(new ZDataRequestBuilder().copy(request).sort(next).build());
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
          {c.name}
          {renderSort(c)}
        </TableCell>
      ))}
    </TableRow>
  );

  const renderValue = (r: T, c: IZMetadata) => {
    return get(r, c.path!);
  };

  const renderBody = () => {
    if (isStateLoading(view)) {
      return (
        <TableRow className='ZTable-row-loading'>
          <TableCell className='ZTable-cell-loading' colSpan={columns.length}>
            <ZSuspenseRotate width={ZSizeFixed.Large} />
          </TableCell>
        </TableRow>
      );
    }

    if (isStateErrored(view)) {
      return (
        <TableRow className='ZTable-row-error'>
          <TableCell className='ZTable-cell-error' colSpan={columns.length}>
            {view.message}
          </TableCell>
        </TableRow>
      );
    }

    return view.map((r: T, ri: number) => {
      const _identifier = identifier(r);
      const key = (c: IZMetadata) => `${_identifier}-${c.id}`;

      return (
        <TableRow key={_identifier} className='ZTable-row' data-row={_identifier} data-row-index={ri}>
          {columns.map((c, ci) => (
            <TableCell
              key={key(c)}
              className={cssJoinDefined('ZTable-cell', classes.cell)}
              data-row={_identifier}
              data-column={c.id}
              data-row-index={ri}
              data-column-index={ci}
            >
              {renderValue(r, c)}
            </TableCell>
          ))}
        </TableRow>
      );
    });
  };

  return (
    <div className={cssJoinDefined('ZTable-root', className, classes.root)}>
      <Table className={cssJoinDefined('ZTable-table', classes.table)} stickyHeader>
        <TableHead className={cssJoinDefined('ZTable-head')}>{renderHead()}</TableHead>
        <TableBody className={cssJoinDefined('ZTable-body', classes.body)}>{renderBody()}</TableBody>
      </Table>
    </div>
  );
}
