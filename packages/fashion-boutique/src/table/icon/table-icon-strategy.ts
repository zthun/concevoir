import { ZWellKnownIconClasses } from '@zthun/helpful-query';
import { IZTableIconRender } from './table-icon-render';
import { ZTableIconRenderFontAwesome } from './table-icon-render-font-awesome';
import { ZTableIconRenderMaterial } from './table-icon-render-material';
import { ZTableIconRenderUnknown } from './table-icon-render-unknown';

export interface IZTableIconStrategy {
  get(cls?: string): IZTableIconRender;
}

export class ZTableIconStrategy implements IZTableIconStrategy {
  private _map = new Map<string, IZTableIconRender>();
  private _default: IZTableIconRender = new ZTableIconRenderUnknown();

  public constructor() {
    this.put(ZWellKnownIconClasses.FontAwesome, new ZTableIconRenderFontAwesome());
    this.put(ZWellKnownIconClasses.Material, new ZTableIconRenderMaterial());
  }

  public get(cls?: string): IZTableIconRender {
    if (!cls) {
      return this._default;
    }

    return this._map.get(cls) || this._default;
  }

  public put(cls: string, render: IZTableIconRender): this {
    this._map.set(cls, render);
    return this;
  }

  public putDefault(render: IZTableIconRender): this {
    this._default = render;
    return this;
  }
}
