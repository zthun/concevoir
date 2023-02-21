import { ZSize } from '@zthun/concevoir-fashion';

/**
 * Represents a component that contains an optional width.
 */
export interface IZComponentWidth<TSize = ZSize> {
  /**
   * Width of the component.
   */
  width?: TSize;
}
