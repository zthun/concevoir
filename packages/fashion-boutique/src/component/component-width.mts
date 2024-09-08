import { ZDeviceValue, ZSize } from "@zthun/fashion-tailor";

/**
 * Represents a component that contains an optional width.
 */
export interface IZComponentWidth<
  TSize = ZSize,
  TDevice = ZDeviceValue<TSize>,
> {
  /**
   * Width of the component.
   */
  width?: TDevice;
}
