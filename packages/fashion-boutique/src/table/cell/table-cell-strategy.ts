import { IZMetadata, ZMetadataType } from '@zthun/helpful-query';
import { createContext, useContext } from 'react';
import { ZTableIconStrategy } from '../icon/table-icon-strategy';
import { IZTableValueRender } from './table-cell-render';
import { ZTableValueRenderDate } from './table-cell-render-date';
import { ZTableValueRenderIcon } from './table-cell-render-icon';
import { ZTableValueRenderText } from './table-cell-render-text';

export interface IZTableValueStrategy {
  get(metadata: IZMetadata): IZTableValueRender;
}

export class ZTableValueStrategy implements IZTableValueStrategy {
  private _types = new Map<ZMetadataType, IZTableValueRender>();
  private _default: IZTableValueRender = new ZTableValueRenderText();

  public constructor() {
    this.putBasicType(ZMetadataType.Text, new ZTableValueRenderText());
    this.putBasicType(ZMetadataType.Icon, new ZTableValueRenderIcon(new ZTableIconStrategy()));
    this.putBasicType(ZMetadataType.Date, new ZTableValueRenderDate());
  }

  public get(metadata: IZMetadata): IZTableValueRender {
    return this._types.get(metadata.type) || this._default;
  }

  public putDefault(render: IZTableValueRender): this {
    this._default = render;
    return this;
  }

  public putBasicType(type: ZMetadataType, render: IZTableValueRender): this {
    this._types.set(type, render);
    return this;
  }
}

export const ZTableValueStrategyContext = createContext<IZTableValueStrategy>(new ZTableValueStrategy());

export function useTableValueStrategy() {
  return useContext(ZTableValueStrategyContext);
}
