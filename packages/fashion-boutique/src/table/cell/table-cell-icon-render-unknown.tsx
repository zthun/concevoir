import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { ReactNode } from 'react';
import { ZIconFontAwesome } from '../../icon/icon-font-awesome';
import { IZTableCellIconRender } from './table-cell-icon-render';

export class ZTableCellIconRenderUnknown implements IZTableCellIconRender {
  public render(): ReactNode {
    return <ZIconFontAwesome name='question' width={ZSizeFixed.Small} />;
  }
}
