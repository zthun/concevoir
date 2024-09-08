import { ZDeviceValue, ZSize } from "@zthun/fashion-tailor";

/**
 * Represents a component that contains a height.
 */
export interface IZComponentHeight<
  TSize = ZSize,
  TDevice = ZDeviceValue<TSize>,
> {
  /**
   * The height of the component.
   */
  height?: TDevice;
}
