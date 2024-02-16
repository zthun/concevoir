import { IZFashion } from '@zthun/fashion-theme';

/**
 * Represents a component that contains color.
 */
export interface IZComponentFashion<T = IZFashion> {
  /**
   * The fashion for the component.
   */
  fashion?: T;
}
