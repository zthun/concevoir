import { ZDeviceValue, ZSize } from '@zthun/fashion-tailor';

/**
 * Represents a component that contains an optional height.
 */
export interface IZComponentHeight<TSize = ZSize> {
  /**
   * The height of the component.
   */
  height?: ZDeviceValue<TSize>;
}
