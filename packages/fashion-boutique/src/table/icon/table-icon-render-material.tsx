import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { ReactNode } from 'react';
import { ZIconMaterial } from 'src/icon/icon-material';
import { IZTableIconRender } from './table-icon-render';

export class ZTableIconRenderMaterial implements IZTableIconRender {
  public render(name: string): ReactNode {
    return <ZIconMaterial name={name} width={ZSizeFixed.Small} />;
  }
}
