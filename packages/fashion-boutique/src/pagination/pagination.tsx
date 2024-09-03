import { Pagination } from "@mui/material";
import { ZOrientation, cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import React from "react";
import { IZComponentDisabled } from "../component/component-disabled.mjs";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentOrientation } from "../component/component-orientation.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentValue } from "../component/component-value.mjs";
import { createStyleHook } from "../theme/styled";

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

const usePaginationStyles = createStyleHook(
  ({ theme }, props: IZPagination) => {
    const { orientation, fashion = theme.component } = props;
    const flexDirection =
      orientation === ZOrientation.Vertical ? "column" : "row";

    return {
      root: {
        ul: {
          flexDirection,
        },
        ".MuiPaginationItem-root": {
          color: fashion.idle.contrast,

          "&.Mui-selected": {
            backgroundColor: fashion.idle.main,
          },

          "&:hover": {
            backgroundColor: firstDefined(
              fashion.hover?.main,
              fashion.idle.main,
            ),
          },
        },
      },
    };
  },
);

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
  const { value, onValueChange, pages, className, disabled } = props;
  const [page, setPage] = useAmbassadorState(value, onValueChange, 1);
  const { classes } = usePaginationStyles(props);

  const handleChange = (_: any, page: number) => setPage(page);

  return (
    <Pagination
      className={cssJoinDefined("ZPagination-root", className, classes.root)}
      count={pages}
      page={page}
      disabled={disabled}
      onChange={handleChange}
      siblingCount={1}
      data-page={page}
    />
  );
}
