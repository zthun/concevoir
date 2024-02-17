import { IZDeviceSizeChart, ZSizeFixed, isDeviceSizeChart } from '@zthun/fashion-tailor';
import { ZFashionElementCtor } from './fashion-element.mjs';

export interface IZWithHeight<THeight> {
  componentHeight: THeight | IZDeviceSizeChart<THeight> | null;

  heightXl(fallback: THeight): THeight;
  heightLg(fallback: THeight): THeight;
  heightMd(fallback: THeight): THeight;
  heightSm(fallback: THeight): THeight;
  heightXs(fallback: THeight): THeight;
}

export function WithHeight<THeight, TBase extends ZFashionElementCtor = ZFashionElementCtor>(Base: TBase) {
  return class extends Base implements IZWithHeight<THeight> {
    _componentHeight: THeight | IZDeviceSizeChart<THeight> | null;

    public get componentHeight() {
      return this._componentHeight;
    }

    public set componentHeight(val: THeight | IZDeviceSizeChart<THeight> | null) {
      this._componentHeight = val;
      this.refreshCssVariables?.call(this);
    }

    public calculateHeight(device: ZSizeFixed): THeight | null | undefined {
      return isDeviceSizeChart(this.componentHeight) ? this.componentHeight[device] : this.componentHeight;
    }

    public heightXl(fallback: THeight) {
      return this.calculateHeight(ZSizeFixed.ExtraLarge) || fallback;
    }

    public heightLg(fallback: THeight) {
      return this.calculateHeight(ZSizeFixed.Large) || this.heightXl(fallback);
    }

    public heightMd(fallback: THeight) {
      return this.calculateHeight(ZSizeFixed.Medium) || this.heightLg(fallback);
    }

    public heightSm(fallback: THeight) {
      return this.calculateHeight(ZSizeFixed.Small) || this.heightMd(fallback);
    }

    public heightXs(fallback: THeight) {
      return this.calculateHeight(ZSizeFixed.ExtraSmall) || this.heightSm(fallback);
    }
  };
}
