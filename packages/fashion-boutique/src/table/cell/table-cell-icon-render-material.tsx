import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { ReactNode } from 'react';
import { ZIconMaterial } from '../../icon/icon-material';
import { IZTableCellIconRender } from './table-cell-icon-render';

export class ZTableCellIconRenderMaterial implements IZTableCellIconRender {
  public render(name: string): ReactNode {
    return <ZIconMaterial name={name} width={ZSizeFixed.Small} />;
  }
}
