import { IZDeviceValueMap, ZSizeFixed, isDeviceValueMap } from '@zthun/fashion-tailor';
import { mutateAttribute } from '@zthun/helpful-dom';
import { ZElementConstructor } from './fashion-element.mjs';

export interface IZWithWidth<TWidth> {
  componentWidth: TWidth | IZDeviceValueMap<TWidth> | null | undefined;

  widthXl(fallback: TWidth): TWidth;
  widthLg(fallback: TWidth): TWidth;
  widthMd(fallback: TWidth): TWidth;
  widthSm(fallback: TWidth): TWidth;
  widthXs(fallback: TWidth): TWidth;
}

export const WithWidthAttributes = ['data-width'];

export function WithWidth<TWidth, TBase extends ZElementConstructor = ZElementConstructor>(Base: TBase) {
  return class extends Base implements IZWithWidth<TWidth> {
    _componentWidth: TWidth | IZDeviceValueMap<TWidth> | null | undefined;

    public get componentWidth() {
      return this._componentWidth;
    }

    public set componentWidth(val: TWidth | IZDeviceValueMap<TWidth> | null | undefined) {
      this._componentWidth = val;
      mutateAttribute(this, 'data-width', JSON.stringify(val));
    }

    public calculateWidth(device: ZSizeFixed): TWidth | null | undefined {
      return isDeviceValueMap(this.componentWidth) ? this.componentWidth[device] : this.componentWidth;
    }

    public widthXl(fallback: TWidth) {
      return this.calculateWidth(ZSizeFixed.ExtraLarge) || fallback;
    }

    public widthLg(fallback: TWidth) {
      return this.calculateWidth(ZSizeFixed.Large) || this.widthXl(fallback);
    }

    public widthMd(fallback: TWidth) {
      return this.calculateWidth(ZSizeFixed.Medium) || this.widthLg(fallback);
    }

    public widthSm(fallback: TWidth) {
      return this.calculateWidth(ZSizeFixed.Small) || this.widthMd(fallback);
    }

    public widthXs(fallback: TWidth) {
      return this.calculateWidth(ZSizeFixed.ExtraSmall) || this.widthSm(fallback);
    }
  };
}
