import { ZSize } from "@zthun/fashion-tailor";

/**
 * Represents a component that contains a height.
 */
export interface IZComponentHeight<TSize = ZSize> {
  /**
   * The height of the component.
   */
  height?: TSize;

  /**
   * Height on lg screens.
   */
  heightLg?: TSize;

  /**
   * Height on md screens.
   */
  heightMd?: TSize;

  /**
   * Height on sm screens.
   */
  heightSm?: TSize;

  /**
   * Height on xs screens.
   */
  heightXs?: TSize;
}
