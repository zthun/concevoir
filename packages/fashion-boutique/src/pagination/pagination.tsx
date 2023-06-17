import { Pagination } from '@mui/material';
import { ZOrientation, cssJoinDefined } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import React from 'react';
import { createStyleHook } from 'src/theme/styled';
import { IZComponentOrientation } from '../component/component-orientation';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';

/**
 * Represents props for the pagination component.
 */
export interface IZPagination extends IZComponentStyle, IZComponentValue<number>, IZComponentOrientation {
  /**
   * The total number of pages.
   */
  pages?: number;
}

const usePaginationStyles = createStyleHook((_, props: IZPagination) => {
  const { orientation } = props;
  const flexDirection = orientation === ZOrientation.Vertical ? 'column' : 'row';

  return {
    root: {
      ul: {
        flexDirection
      }
    }
  };
});

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
  const { classes } = usePaginationStyles(props);

  const handleChange = (_: any, page: number) => setPage(page);

  return (
    <Pagination
      className={cssJoinDefined('ZPagination-root', className, classes.root)}
      count={pages}
      page={page}
      onChange={handleChange}
      siblingCount={1}
      data-page={page}
    />
  );
}
