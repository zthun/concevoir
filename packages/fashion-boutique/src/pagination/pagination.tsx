import { Pagination } from '@mui/material';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import React from 'react';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';

/**
 * Represents props for the pagination component.
 */
export interface IZPagination extends IZComponentStyle, IZComponentValue<number> {
  /**
   * The total number of pages.
   */
  pages?: number;
}

/**
 * Standard pagination component.
 *
 * @param props -
 *        The properties for the component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZPagination(props: IZPagination) {
  const { value, onValueChange, pages, className } = props;

  const [page, setPage] = useAmbassadorState(value, onValueChange);

  const handleChange = (_: any, page: number) => setPage(page);

  return (
    <Pagination
      className={cssJoinDefined('ZPagination-root', className)}
      count={pages}
      page={page}
      onChange={handleChange}
      showFirstButton
      showLastButton
      data-page={page}
    ></Pagination>
  );
}
