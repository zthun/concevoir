import { IZFashion } from '@zthun/fashion-designer';

/**
 * Represents a component that contains color.
 */
export interface IZComponentFashion<T = IZFashion> {
  /**
   * The fashion for the component.
   */
  fashion?: T;
}
