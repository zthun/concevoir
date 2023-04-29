import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentLabel } from '../component/component-label';
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

export interface IZLabel extends IZComponentLabel, IZComponentStyle, IZComponentRequired {
  id: string;
}

export function ZLabel(props: IZLabel) {
  const { label, id, className, required } = props;
  const { classes } = useLabelStyles();

  return (
    <label id={id} className={cssJoinDefined('ZLabel-root', className, classes.root)} data-required={required}>
      {label}
    </label>
  );
}
