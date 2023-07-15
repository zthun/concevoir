import { ZOrientation } from '@zthun/helpful-fn';

/**
 * Represents a component that can be oriented in one of two ways.
 */
export interface IZComponentOrientation {
  /**
   * Whether the component has a vertical or horizontal layout.
   */
  orientation?: ZOrientation;
  /**
   * Orientation for large screens.
   */
  orientationLg?: ZOrientation;
  /**
   * Orientation for medium screens.
   */
  orientationMd?: ZOrientation;
  /**
   * Orientation for small screens.
   */
  orientationSm?: ZOrientation;
  /**
   * Orientation for extra small screens.
   */
  orientationXs?: ZOrientation;
}
