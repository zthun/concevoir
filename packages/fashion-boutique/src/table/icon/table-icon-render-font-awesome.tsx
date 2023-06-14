import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { ReactNode } from 'react';
import { ZIconFontAwesome } from '../../icon/icon-font-awesome';
import { IZTableIconRender } from './table-icon-render';

export class ZTableIconRenderFontAwesome implements IZTableIconRender {
  public constructor(private _family: 'classic' | 'brands' | 'sharp' = 'classic') {}

  public render(name: string): ReactNode {
    return <ZIconFontAwesome name={name} family={this._family} width={ZSizeFixed.Small} />;
  }
}
