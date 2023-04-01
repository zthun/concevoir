import { FormLabel } from '@mui/material';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { createStyleHook } from '../theme/styled';

export interface IZLabel extends IZComponentStyle, IZComponentName, IZComponentFashion, IZComponentHierarchy {}

const useLabelStyles = createStyleHook((_, props: IZLabel) => {
  const { fashion } = props;
  const color = firstDefined('inherit', fashion?.main);

  return {
    root: {
      color,
      fontWeight: 'bold'
    }
  };
});

export function ZLabel(props: IZLabel) {
  const { fashion, name, className, children } = props;
  const { classes } = useLabelStyles(props);

  const _fashion = firstDefined('Inherit', fashion?.main);
  return (
    <FormLabel
      className={cssJoinDefined('ZLabel-root', className, classes.root)}
      data-name={name}
      data-fashion={_fashion}
    >
      {children}
    </FormLabel>
  );
}
