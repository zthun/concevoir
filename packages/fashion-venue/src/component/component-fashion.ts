import { IZFashion } from '@zthun/fashion-chroma';

/**
 * Represents a component that contains color.
 */
export interface IZComponentFashion<T = IZFashion> {
  /**
   * The fashion for the component.
   */
  fashion?: T;
}
