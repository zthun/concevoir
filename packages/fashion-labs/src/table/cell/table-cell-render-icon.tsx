import { IZMetadata } from '@zthun/helpful-query';
import { ReactNode } from 'react';
import { IZTableCellIconStrategy } from './table-cell-icon-strategy';
import { IZTableCellRender } from './table-cell-render';

export class ZTableCellRenderIcon implements IZTableCellRender<string> {
  public constructor(private _render: IZTableCellIconStrategy) {}

  public render(value: string, metadata: IZMetadata): ReactNode {
    return this._render.get(metadata.cls).render(String(value), metadata);
  }
}
