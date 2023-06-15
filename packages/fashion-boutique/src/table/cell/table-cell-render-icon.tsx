import { IZMetadata } from '@zthun/helpful-query';
import { ReactNode } from 'react';
import { IZTableIconStrategy } from '../icon/table-icon-strategy';
import { IZTableValueRender } from './table-cell-render';

export class ZTableValueRenderIcon implements IZTableValueRender {
  public constructor(private _render: IZTableIconStrategy) {}

  public render(value: unknown, metadata: IZMetadata): ReactNode {
    return this._render.get(metadata.cls).render(String(value), metadata);
  }
}
