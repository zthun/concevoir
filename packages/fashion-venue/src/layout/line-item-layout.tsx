import { ZSizeFixed } from '@zthun/fashion-designer';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode } from 'react';
import { IZComponentAdornment } from '../component/component-adornment';
import { IZComponentStyle } from '../component/component-style';
import { makeStyles } from '../theme/make-styles';

export interface IZLineItemLayout extends IZComponentStyle, IZComponentAdornment {
  body?: ReactNode;
}

const useLineItemLayoutStyles = makeStyles()((theme) => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      width: '100%'
    },
    prefix: {
      flexGrow: 0,
      paddingRight: theme.gap(ZSizeFixed.Small)
    },

    body: {
      flexGrow: 1,
      flexBasis: 0
    },

    suffix: {
      flexGrow: 0,
      paddingLeft: theme.gap(ZSizeFixed.Small)
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
export function ZLineItemLayout(props: IZLineItemLayout) {
  const { className, prefix, body, suffix } = props;
  const { classes } = useLineItemLayoutStyles();

  return (
    <div className={cssJoinDefined('ZLineItemLayout-root', className, classes.root)}>
      <div className={cssJoinDefined('ZLineItemLayout-prefix', classes.prefix)}>{prefix}</div>
      <div className={cssJoinDefined('ZLineItemLayout-body', classes.body)}>{body}</div>
      <div className={cssJoinDefined('ZLineItemLayout-suffix', classes.suffix)}>{suffix}</div>
    </div>
  );
}
