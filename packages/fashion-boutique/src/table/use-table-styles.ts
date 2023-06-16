import { ZSizeFixed } from '@zthun/fashion-tailor';
import { createStyleHook } from '../theme/styled';

export const useTableStyles = createStyleHook(({ theme, tailor }) => {
  const border = `${tailor.thickness(ZSizeFixed.ExtraSmall)} solid rgb(220, 220, 220)`;
  const headerBorder = `${tailor.thickness(ZSizeFixed.ExtraSmall)} solid rgb(220, 220, 220)`;

  return {
    root: {
      color: theme.opposite.main,
      width: '100%'
    },

    container: {
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

    toolbar: {
      backgroundColor: theme.primary.main,
      color: theme.primary.contrast,
      borderTopLeftRadius: tailor.thickness(ZSizeFixed.ExtraLarge),
      borderTopRightRadius: tailor.thickness(ZSizeFixed.ExtraLarge),
      padding: tailor.gap(ZSizeFixed.ExtraSmall),
      border: `1px solid ${theme.primary.dark}`,
      borderBottom: 0,
      // There is this bizarre bug that I can't figure out where the
      // toolbar is offset by 2 pixels.  Just fix the stupid thing here.
      // If it's wrong on some other view, just update the style for that
      // view elsewhere.
      marginRight: -2
    },

    info: {
      backgroundColor: theme.primary.main,
      color: theme.primary.contrast,
      borderBottomLeftRadius: tailor.thickness(ZSizeFixed.ExtraLarge),
      borderBottomRightRadius: tailor.thickness(ZSizeFixed.ExtraLarge),
      border: `1px solid ${theme.primary.dark}`,
      borderTop: 0,
      padding: tailor.gap(ZSizeFixed.ExtraSmall)
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
