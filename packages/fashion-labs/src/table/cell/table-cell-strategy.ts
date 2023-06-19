import { IZMetadata, ZMetadataType } from '@zthun/helpful-query';
import { createContext, useContext } from 'react';
import { ZTableCellIconStrategy } from './table-cell-icon-strategy';
import { IZTableCellRender } from './table-cell-render';
import { ZTableCellRenderDate } from './table-cell-render-date';
import { ZTableCellRenderIcon } from './table-cell-render-icon';
import { ZTableCellRenderText } from './table-cell-render-text';

export interface IZTableCellStrategy {
  get<V = unknown, T = unknown>(metadata: IZMetadata): IZTableCellRender<V, T>;
}

export class ZTableCellStrategy implements IZTableCellStrategy {
  private _types = new Map<ZMetadataType, IZTableCellRender>();
  private _default: IZTableCellRender = new ZTableCellRenderText();

  public constructor() {
    this.putBasicType(ZMetadataType.Text, new ZTableCellRenderText());
    this.putBasicType(ZMetadataType.Icon, new ZTableCellRenderIcon(new ZTableCellIconStrategy()));
    this.putBasicType(ZMetadataType.Date, new ZTableCellRenderDate());
  }

  public get(metadata: IZMetadata): IZTableCellRender {
    return this._types.get(metadata.type) || this._default;
  }

  public putDefault(render: IZTableCellRender): this {
    this._default = render;
    return this;
  }

  public putBasicType(type: ZMetadataType, render: IZTableCellRender): this {
    this._types.set(type, render);
    return this;
  }
}

export const ZTableValueStrategyContext = createContext<IZTableCellStrategy>(new ZTableCellStrategy());

export function useTableValueStrategy() {
  return useContext(ZTableValueStrategyContext);
}
