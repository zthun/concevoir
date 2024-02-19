import { ZGapSize, ZSizeVoid } from '@zthun/fashion-tailor';
import { IZQuadrilateral, firstDefined } from '@zthun/helpful-fn';
import { ZFashionElementCtor } from './fashion-element.mjs';

export interface IZWithPadding {
  padding?: Partial<IZQuadrilateral<ZGapSize>>;

  paddingBottom(): ZGapSize;
  paddingLeft(): ZGapSize;
  paddingRight(): ZGapSize;
  paddingTop(): ZGapSize;
}

export function WithPadding<TBase extends ZFashionElementCtor = ZFashionElementCtor>(Base: TBase) {
  return class extends Base implements IZWithPadding {
    _padding?: Partial<IZQuadrilateral<ZGapSize>>;

    public get padding() {
      return this._padding;
    }

    public set padding(val: Partial<IZQuadrilateral<ZGapSize>> | undefined) {
      this._padding = val;
      this.refreshCssVariables?.call(this);
    }

    public paddingBottom() {
      return firstDefined(ZSizeVoid.None, this._padding?.bottom);
    }

    public paddingLeft() {
      return firstDefined(ZSizeVoid.None, this.padding?.left);
    }

    public paddingRight() {
      return firstDefined(ZSizeVoid.None, this._padding?.right);
    }

    public paddingTop() {
      return firstDefined(ZSizeVoid.None, this._padding?.top);
    }
  };
}
