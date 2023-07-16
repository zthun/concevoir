import { ZSizeFixed, ZSizeVoid } from '@zthun/fashion-tailor';
import { ZOrientation, cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentOrientation } from '../component/component-orientation';
import { IZComponentStyle } from '../component/component-style';
import { ZStack } from '../stack/stack';
import { IZLabel, ZLabel } from './label';

export interface ZLabeled
  extends IZComponentName,
    IZComponentLabel,
    IZComponentStyle,
    IZComponentOrientation,
    IZComponentHierarchy {
  LabelProps?: Omit<IZLabel, 'id'>;
  gap?: ZSizeVoid | ZSizeFixed;
}

export function ZLabeled(props: ZLabeled) {
  const {
    children,
    className,
    label,
    name,
    gap = ZSizeFixed.ExtraSmall,
    orientation = ZOrientation.Vertical,
    LabelProps
  } = props;
  const align = orientation === ZOrientation.Horizontal ? 'center' : undefined;

  const renderLabel = () => label && <ZLabel {...LabelProps}>{label}</ZLabel>;

  return (
    <ZStack
      className={cssJoinDefined('ZLabeled-root', className)}
      orientation={orientation}
      alignItems={align}
      gap={gap}
      name={name}
    >
      {renderLabel()}
      <div>{children}</div>
    </ZStack>
  );
}
