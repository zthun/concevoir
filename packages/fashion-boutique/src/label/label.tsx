import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentRequired } from '../component/component-required';
import { IZComponentStyle } from '../component/component-style';
import { createStyleHook } from '../theme/styled';

const useLabelStyles = createStyleHook(({ theme, tailor }) => ({
  root: {
    'display': 'block',
    'fontWeight': 'bold',

    '&[data-required="true"]::after': {
      content: '"*"',
      color: theme.error.main,
      marginLeft: tailor.thickness(ZSizeFixed.Medium)
    }
  }
}));

export interface IZLabel extends IZComponentHierarchy, IZComponentStyle, IZComponentRequired {
  htmlFor?: string;
}

export function ZLabel(props: IZLabel) {
  const { children, className, required, htmlFor } = props;
  const { classes } = useLabelStyles();

  return (
    <label
      className={cssJoinDefined('ZLabel-root', className, classes.root)}
      htmlFor={htmlFor}
      data-required={required}
    >
      {children}
    </label>
  );
}
