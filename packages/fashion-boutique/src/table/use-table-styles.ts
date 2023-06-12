import { ZSizeFixed } from '@zthun/fashion-tailor';
import { createStyleHook } from '../theme/styled';

export const useTableStyles = createStyleHook(({ theme, tailor }) => {
  return {
    root: {
      color: theme.opposite.main,
      width: '100%'
    },

    cell: {
      color: 'inherit'
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

    text: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },

    sort: {
      marginLeft: tailor.gap(ZSizeFixed.ExtraSmall)
    },

    tableNotLoaded: {
      textAlign: 'center',
      verticalAlign: 'middle',
      padding: '4rem'
    }
  };
});
