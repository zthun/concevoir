import { ZSize } from "@zthun/fashion-tailor";

/**
 * Represents a component that contains an optional width.
 */
export interface IZComponentWidth<TSize = ZSize> {
  /**
   * Width of the component.
   */
  width?: TSize;

  /**
   * Width on lg screens.
   */
  widthLg?: TSize;

  /**
   * Width on md screens.
   */
  widthMd?: TSize;

  /**
   * Width on sm screens.
   */
  widthSm?: TSize;

  /**
   * Width on xs screens.
   */
  widthXs?: TSize;
}
