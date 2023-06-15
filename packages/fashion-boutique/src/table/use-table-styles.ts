import { ZSizeFixed } from '@zthun/fashion-tailor';
import { createStyleHook } from '../theme/styled';

export const useTableStyles = createStyleHook(({ theme, tailor }) => {
  const border = `${tailor.thickness(ZSizeFixed.ExtraSmall)} solid rgb(220, 220, 220)`;
  const headerBorder = `${tailor.thickness(ZSizeFixed.ExtraSmall)} solid ${theme.primary.contrast}`;

  return {
    root: {
      color: theme.opposite.main,
      width: '100%',
      border
    },

    cell: {
      'color': 'inherit',
      'borderRight': border,

      '&:last-child': {
        borderRight: 0
      }
    },

    header: {
      'backgroundColor': theme.primary.main,
      'color': theme.primary.contrast,
      'fontWeight': 'bold',

      'borderRight': headerBorder,

      '&:last-child': {
        borderRight: 0
      }
    },

    headerSort: {
      'cursor': 'pointer',

      '&:hover': {
        backgroundColor: theme.primary.light
      }
    },

    table: {
      borderCollapse: 'separate',
      tableLayout: 'fixed',
      width: 'auto'
    },

    text: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },

    sort: {
      marginLeft: tailor.gap(ZSizeFixed.ExtraSmall)
    },

    star: {
      width: '100%'
    },

    tableNotLoaded: {
      textAlign: 'center',
      verticalAlign: 'middle',
      padding: '4rem'
    }
  };
});
