import { ZGapSize, ZSizeVaried, ZSizeVoid } from '@zthun/fashion-tailor';
import { IZQuadrilateral, firstDefined } from '@zthun/helpful-fn';
import { ZFashionElementCtor } from './fashion-element.mjs';

export interface IZWithMargin {
  margin?: Partial<IZQuadrilateral<ZGapSize | ZSizeVaried.Fit>>;

  marginBottom(): ZGapSize;
  marginLeft(): ZGapSize;
  marginRight(): ZGapSize;
  marginTop(): ZGapSize;
}

export function WithMargin<TBase extends ZFashionElementCtor = ZFashionElementCtor>(Base: TBase) {
  return class extends Base implements IZWithMargin {
    _padding?: Partial<IZQuadrilateral<ZGapSize>>;

    public get margin() {
      return this._padding;
    }

    public set margin(val: Partial<IZQuadrilateral<ZGapSize>> | undefined) {
      this._padding = val;
      this.refreshCssVariables?.call(this);
    }

    public marginBottom() {
      return firstDefined(ZSizeVoid.None, this._padding?.bottom);
    }

    public marginLeft() {
      return firstDefined(ZSizeVoid.None, this.margin?.left);
    }

    public marginRight() {
      return firstDefined(ZSizeVoid.None, this._padding?.right);
    }

    public marginTop() {
      return firstDefined(ZSizeVoid.None, this._padding?.top);
    }
  };
}
