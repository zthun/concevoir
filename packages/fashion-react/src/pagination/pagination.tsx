import { Pagination } from '@mui/material';
import {
  IZComponentDisabled,
  IZComponentFashion,
  IZComponentOrientation,
  IZComponentValue
} from '@zthun/fashion-boutique';
import { ZFashionArea } from '@zthun/fashion-theme';
import { ZOrientation, cssJoinDefined } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import React from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { createStyleHook } from '../theme/styled';

/**
 * Represents props for the pagination component.
 */
export interface IZPagination
  extends IZComponentStyle,
    IZComponentValue<number>,
    IZComponentOrientation,
    IZComponentDisabled,
    IZComponentFashion {
  /**
   * The total number of pages.
   */
  pages?: number;
}

const usePaginationStyles = createStyleHook(({ theme }, props: IZPagination) => {
  const { orientation, fashion } = props;
  const $fashion = theme[fashion || ZFashionArea.Component];
  const flexDirection = orientation === ZOrientation.Vertical ? 'column' : 'row';

  return {
    root: {
      'ul': {
        flexDirection
      },
      '.MuiPaginationItem-root': {
        'color': $fashion.contrast,

        '&.Mui-selected': {
          backgroundColor: $fashion.main
        },

        '&:hover': {
          backgroundColor: $fashion.light
        }
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
  const { value, onValueChange, pages, className, disabled, fashion } = props;
  const [page, setPage] = useAmbassadorState(value, onValueChange, 1);
  const { classes } = usePaginationStyles(props);

  const handleChange = (_: any, page: number) => setPage(page);

  return (
    <Pagination
      className={cssJoinDefined('ZPagination-root', className, classes.root)}
      count={pages}
      page={page}
      disabled={disabled}
      onChange={handleChange}
      siblingCount={1}
      data-page={page}
      data-pages={pages}
      data-fashion={fashion}
    />
  );
}
