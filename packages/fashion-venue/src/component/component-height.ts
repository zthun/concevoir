import { ZSize } from '@zthun/fashion-chroma';

/**
 * Represents a component that contains a height.
 */
export interface IZComponentHeight<TSize = ZSize> {
  /**
   * The height of the component.
   */
  height?: TSize;
}
