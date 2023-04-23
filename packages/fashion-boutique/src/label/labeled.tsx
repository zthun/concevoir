import { ZSizeFixed, ZSizeVoid } from '@zthun/fashion-tailor';
import { ZOrientation, createGuid, cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useMemo } from 'react';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { ZStack } from '../stack/stack';
import { createStyleHook } from '../theme/styled';
import { ZLabel } from './label';

const useLabeledStyles = createStyleHook(() => ({
  root: {},
  label: {
    display: 'block',
    fontWeight: 'bold'
  }
}));

export interface ZLabeled extends IZComponentLabel, IZComponentStyle, IZComponentName {
  gap?: ZSizeVoid | ZSizeFixed;
  children: (id: string) => ReactNode | ReactNode[];
}

export function ZLabeled(props: ZLabeled) {
  const { children, label, className, name, gap = ZSizeFixed.ExtraSmall } = props;
  const id = useMemo(() => createGuid(), []);
  const { classes } = useLabeledStyles();

  return (
    <ZStack
      className={cssJoinDefined('ZLabeled-root', className, classes.root)}
      orientation={ZOrientation.Vertical}
      gap={gap}
      name={name}
    >
      <ZLabel id={id} label={label} />
      {children(id)}
    </ZStack>
  );
}
