import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { createStyleHook } from '../theme/styled';

const useLabelStyles = createStyleHook(() => ({
  root: {
    display: 'block',
    fontWeight: 'bold'
  }
}));

export interface IZLabel extends IZComponentLabel, IZComponentStyle, IZComponentName {
  id: string;
}

export function ZLabel(props: IZLabel) {
  const { label, id, className, name } = props;
  const { classes } = useLabelStyles();

  return (
    <label id={id} className={cssJoinDefined('ZLabel-root', className, classes.root)} data-name={name}>
      {label}
    </label>
  );
}
