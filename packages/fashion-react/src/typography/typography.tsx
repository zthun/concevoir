import { IZComponentFont, ZTypographyElement } from '@zthun/fashion-boutique';
import { includeCustomElement } from '@zthun/helpful-dom';
import React, { useMemo } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-typography']: ZTypographyElement & any;
    }
  }
}

export interface IZTypographyProps extends IZComponentHierarchy, IZComponentStyle, IZComponentFont {}

export const ZTypography = (props: IZTypographyProps) => {
  useMemo(() => includeCustomElement(ZTypographyElement), []);

  const { children, size, family, unit } = props;
  return (
    <z-typography size={size} family={family} unit={unit}>
      {children}
    </z-typography>
  );
};
