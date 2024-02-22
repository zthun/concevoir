import { IZFashion } from '@zthun/fashion-theme';

/**
 * Represents a component that contains color.
 *
 * @deprecated Use the IZComponentFashion in boutique.
 */
export interface IZComponentFashion<T = IZFashion> {
  /**
   * The fashion for the component.
   */
  fashion?: T;
}
