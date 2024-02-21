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

  public toDeviceMap(): Required<IZDeviceValueMap<T>> {
    return {
      xl: this.xl(),
      lg: this.lg(),
      md: this.md(),
      sm: this.sm(),
      xs: this.xs()
    };
  }
}

/**
 * Casts the data to a device value map.
 *
 * This is a shortcut to the following code block
 *
 * @param data -
 *        The data to cast.
 *
 * @returns
 *        Data as a fully populated {@link IZDeviceValueMap}.  Returns the fallback
 *        as a fully populated {@link IZDeviceValueMap} if data is null or undefined;
 */
export function castDeviceMap<TData>(data: ZDeviceValue<TData>, fallback: TData): Required<IZDeviceValueMap<TData>> {
  const bounds = new ZDeviceBounds(data, fallback);
  return bounds.toDeviceMap();
}
