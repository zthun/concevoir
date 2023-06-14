import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { ReactNode } from 'react';
import { ZIconFontAwesome } from '../../icon/icon-font-awesome';
import { IZTableIconRender } from './table-icon-render';

export class ZTableIconRenderFontAwesome implements IZTableIconRender {
  public render(name: string): ReactNode {
    return <ZIconFontAwesome name={name} width={ZSizeFixed.Small} />;
  }
}
