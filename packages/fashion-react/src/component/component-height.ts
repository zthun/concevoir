import { ZSize } from '@zthun/concevoir-fashion';

/**
 * Represents a component that contains a height.
 */
export interface IZComponentHeight<TSize = ZSize> {
  /**
   * The height of the component.
   */
  height?: TSize;
}
