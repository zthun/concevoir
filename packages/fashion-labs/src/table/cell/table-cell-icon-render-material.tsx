import { ZIconMaterial } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { ReactNode } from 'react';
import { IZTableCellIconRender } from './table-cell-icon-render';

export class ZTableCellIconRenderMaterial implements IZTableCellIconRender {
  public render(name: string): ReactNode {
    return <ZIconMaterial name={name} width={ZSizeFixed.Small} />;
  }
}
