import { Table, TableBody, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ComponentPropsWithRef, ForwardedRef, forwardRef, useMemo } from 'react';
import { ItemProps, ScrollerProps, TableBodyProps, TableComponents, TableProps } from 'react-virtuoso';

export function useTableComponents<T>(): TableComponents {
  return useMemo(
    () => ({
      Scroller: forwardRef(function $Scroller(props: ScrollerProps, ref: ForwardedRef<HTMLDivElement>) {
        return <TableContainer {...props} ref={ref} />;
      }),

      TableHead: forwardRef(function $TableHead(
        p: ComponentPropsWithRef<'thead'>,
        r: ForwardedRef<HTMLTableSectionElement>
      ) {
        return <TableHead {...p} className={cssJoinDefined('ZTable-head')} ref={r} />;
      }),

      TableBody: forwardRef(function $TableBody(p: TableBodyProps, r: ForwardedRef<HTMLTableSectionElement>) {
        return <TableBody {...p} ref={r} />;
      }),

      TableFoot: forwardRef(function $TableFoot(
        p: ComponentPropsWithRef<'tfoot'>,
        r: ForwardedRef<HTMLTableSectionElement>
      ) {
        return <TableFooter {...p} className={cssJoinDefined('ZTable-foot')} ref={r} />;
      }),

      Table: (p: TableProps) => (
        <Table
          {...p}
          className={cssJoinDefined('ZTable-table')}
          stickyHeader
          style={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
        />
      ),

      TableRow: function $TableRow(props: ItemProps<T>) {
        const { style, children } = props;
        const index = props['data-index'];
        const itemGroupIndex = props['data-item-group-index'];
        const itemIndex = props['data-item-index'];
        const knownSize = props['data-known-size'];

        return (
          <TableRow
            className={cssJoinDefined('ZTable-row')}
            style={style}
            data-index={index}
            data-item-group-index={itemGroupIndex}
            data-item-index={itemIndex}
            data-known-size={knownSize}
          >
            {children}
          </TableRow>
        );
      }
    }),
    []
  );
}
