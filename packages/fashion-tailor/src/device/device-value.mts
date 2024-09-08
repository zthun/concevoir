import { firstDefined } from "@zthun/helpful-fn";

/**
 * Represents values
 */
export interface IZDeviceValues<T> {
  /**
   * Default value for all devices.
   */
  xl: T;
  /**
   * Value for a large breakpoint.
   */
  lg?: T;
  /**
   * Value for a medium breakpoint.
   */
  md?: T;
  /**
   * Value for a small breakpoint.
   */
  sm?: T;
  /**
   * Value for an extra small breakpoint.
   */
  xs?: T;
}

export type ZDeviceValue<T> = T | IZDeviceValues<T>;

export function isDeviceValues<T>(
  value: ZDeviceValue<T> | null | undefined,
): value is IZDeviceValues<T> {
  return value != null && Object.prototype.hasOwnProperty.call(value, "xl");
}

export class ZDeviceValues<T> implements Required<Readonly<IZDeviceValues<T>>> {
  public readonly xl: T;
  public readonly lg: T;
  public readonly md: T;
  public readonly sm: T;
  public readonly xs: T;

  public constructor(value: ZDeviceValue<T> | undefined | null, fallback: T) {
    if (isDeviceValues(value)) {
      this.xl = value.xl;
      this.lg = firstDefined(this.xl, value.lg);
      this.md = firstDefined(this.lg, value.md);
      this.sm = firstDefined(this.md, value.sm);
      this.xs = firstDefined(this.sm, value.xs);
    } else {
      this.xl = firstDefined(fallback, value);
      this.lg = firstDefined(fallback, value);
      this.md = firstDefined(fallback, value);
      this.sm = firstDefined(fallback, value);
      this.xs = firstDefined(fallback, value);
    }
  }
}
