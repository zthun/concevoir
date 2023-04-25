import { ZSizeFixed, ZSizeVoid } from '@zthun/fashion-tailor';
import { ZOrientation, createGuid, cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useMemo } from 'react';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { ZStack } from '../stack/stack';
import { ZLabel } from './label';

export interface ZLabeled extends IZComponentLabel, IZComponentStyle, IZComponentName {
  gap?: ZSizeVoid | ZSizeFixed;
  children: (id: string) => ReactNode | ReactNode[];
}

export function ZLabeled(props: ZLabeled) {
  const { children, label, className, name, gap = ZSizeFixed.ExtraSmall } = props;
  const id = useMemo(() => createGuid(), []);

  return (
    <ZStack
      className={cssJoinDefined('ZLabeled-root', className)}
      orientation={ZOrientation.Vertical}
      gap={gap}
      name={name}
    >
      <ZLabel id={id} label={label} />
      {children(id)}
    </ZStack>
  );
}
