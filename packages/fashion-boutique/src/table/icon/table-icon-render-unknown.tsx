import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { ReactNode } from 'react';
import { ZIconFontAwesome } from '../../icon/icon-font-awesome';
import { IZTableIconRender } from './table-icon-render';

export class ZTableIconRenderUnknown implements IZTableIconRender {
  public render(): ReactNode {
    return <ZIconFontAwesome name='question' width={ZSizeFixed.Small} />;
  }
}
