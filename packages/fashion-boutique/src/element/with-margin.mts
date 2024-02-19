import { ZGapSize, ZSizeVaried, ZSizeVoid } from '@zthun/fashion-tailor';
import { IZQuadrilateral, firstDefined } from '@zthun/helpful-fn';
import { ZElementConstructor } from './fashion-element.mjs';
import { ZRefreshCssVariables } from './with-css-lifecycle.mjs';

export interface IZWithMargin {
  margin?: Partial<IZQuadrilateral<ZGapSize | ZSizeVaried.Fit>>;

  marginBottom(): ZGapSize;
  marginLeft(): ZGapSize;
  marginRight(): ZGapSize;
  marginTop(): ZGapSize;
}

export function WithMargin<TBase extends ZElementConstructor = ZElementConstructor>(Base: TBase) {
  return class extends Base implements IZWithMargin {
    _margin?: Partial<IZQuadrilateral<ZGapSize>>;
    refreshCssVariables?: ZRefreshCssVariables;

    public get margin() {
      return this._margin;
    }

    public set margin(val: Partial<IZQuadrilateral<ZGapSize>> | undefined) {
      this._margin = val;
      this.refreshCssVariables?.call(this);
    }

    public marginBottom() {
      return firstDefined(ZSizeVoid.None, this.margin?.bottom);
    }

    public marginLeft() {
      return firstDefined(ZSizeVoid.None, this.margin?.left);
    }

    public marginRight() {
      return firstDefined(ZSizeVoid.None, this.margin?.right);
    }

    public marginTop() {
      return firstDefined(ZSizeVoid.None, this.margin?.top);
    }
  };
}
