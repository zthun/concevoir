import { ZWellKnownIconClasses } from '@zthun/helpful-query';
import { IZTableCellIconRender } from './table-cell-icon-render';
import { ZTableCellIconRenderFontAwesome } from './table-cell-icon-render-font-awesome';
import { ZTableCellIconRenderMaterial } from './table-cell-icon-render-material';
import { ZTableCellIconRenderUnknown } from './table-cell-icon-render-unknown';

export interface IZTableCellIconStrategy {
  get(cls?: string): IZTableCellIconRender;
}

export class ZTableCellIconStrategy implements IZTableCellIconStrategy {
  private _map = new Map<string, IZTableCellIconRender>();
  private _default: IZTableCellIconRender = new ZTableCellIconRenderUnknown();

  public constructor() {
    this.put(ZWellKnownIconClasses.FontAwesome, new ZTableCellIconRenderFontAwesome());
    this.put(ZWellKnownIconClasses.FontAwesomeBrands, new ZTableCellIconRenderFontAwesome('brands'));
    this.put(ZWellKnownIconClasses.FontAwesomeSharp, new ZTableCellIconRenderFontAwesome('sharp'));
    this.put(ZWellKnownIconClasses.Material, new ZTableCellIconRenderMaterial());
  }

  public get(cls?: string): IZTableCellIconRender {
    if (!cls) {
      return this._default;
    }

    return this._map.get(cls) || this._default;
  }

  public put(cls: string, render: IZTableCellIconRender): this {
    this._map.set(cls, render);
    return this;
  }

  public putDefault(render: IZTableCellIconRender): this {
    this._default = render;
    return this;
  }
}
