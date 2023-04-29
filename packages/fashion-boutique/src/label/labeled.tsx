import { ZSizeFixed, ZSizeVoid } from '@zthun/fashion-tailor';
import { ZOrientation, createGuid, cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useMemo } from 'react';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { ZStack } from '../stack/stack';
import { IZLabel, ZLabel } from './label';

export interface ZLabeled extends IZComponentName, IZComponentStyle {
  gap?: ZSizeVoid | ZSizeFixed;
  LabelProps?: Omit<IZLabel, 'id'>;
  children: (id: string) => ReactNode | ReactNode[];
}

export function ZLabeled(props: ZLabeled) {
  const { children, className, name, gap = ZSizeFixed.ExtraSmall, LabelProps } = props;
  const id = useMemo(() => createGuid(), []);

  const renderLabel = () => {
    if (!LabelProps?.label) {
      return null;
    }

    return <ZLabel {...LabelProps} id={id} />;
  };

  return (
    <ZStack
      className={cssJoinDefined('ZLabeled-root', className)}
      orientation={ZOrientation.Vertical}
      gap={gap}
      name={name}
    >
      {renderLabel()}
      {children(id)}
    </ZStack>
  );
}
