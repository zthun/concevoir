import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode } from 'react';
import { IZComponentAdornment } from '../component/component-adornment.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { createStyleHook } from '../theme/styled';

export interface IZLineItem extends IZComponentStyle, IZComponentAdornment {
  body?: ReactNode;
}

const useLineItemStyles = createStyleHook(({ tailor }) => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      width: '100%'
    },

    prefix: {
      flexGrow: 0,
      paddingRight: tailor.gap(ZSizeFixed.Small)
    },

    body: {
      flexGrow: 1,
      flexBasis: 0
    },

    suffix: {
      flexGrow: 0,
      paddingLeft: tailor.gap(ZSizeFixed.Small)
    }
  };
});

/**
 * Represents a simple flex 0-1-0 component.
 *
 * @param props -
 *        The properties to the line item.
 *
 * @returns
 *        The JSX element to render the line item.
 *
 */
export function ZLineItem(props: IZLineItem) {
  const { className, prefix, body, suffix } = props;
  const { classes } = useLineItemStyles();

  return (
    <div className={cssJoinDefined('ZLineItem-root', className, classes.root)}>
      <div className={cssJoinDefined('ZLineItem-prefix', classes.prefix)}>{prefix}</div>
      <div className={cssJoinDefined('ZLineItem-body', classes.body)}>{body}</div>
      <div className={cssJoinDefined('ZLineItem-suffix', classes.suffix)}>{suffix}</div>
    </div>
  );
}
