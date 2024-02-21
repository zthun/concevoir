import { ZSizeFixed } from '../fixed/size-fixed.mjs';
import { IZDeviceValueMap, isDeviceValueMap } from './device-value-map.mjs';

export type ZDeviceValue<T> = T | Partial<IZDeviceValueMap<T>> | null | undefined;

export class ZDeviceBounds<T> {
  public constructor(
    private _val: ZDeviceValue<T>,
    private _fallback: T
  ) {}

  public calculate(device: ZSizeFixed): T | null | undefined {
    return isDeviceValueMap(this._val) ? this._val[device] : this._val;
  }

  public xl() {
    return this.calculate(ZSizeFixed.ExtraLarge) || this._fallback;
  }

  public lg() {
    return this.calculate(ZSizeFixed.Large) || this.xl();
  }

  public md() {
    return this.calculate(ZSizeFixed.Medium) || this.lg();
  }

  public sm() {
    return this.calculate(ZSizeFixed.Small) || this.md();
  }

  public xs() {
    return this.calculate(ZSizeFixed.ExtraSmall) || this.sm();
  }
}
