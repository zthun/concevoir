import { ZOrientation } from '@zthun/helpful-fn';

/**
 * Represents a component that can be oriented in one of two ways.
 */
export interface IZComponentOrientation {
  /**
   * Whether the component has a vertical or horizontal layout.
   */
  orientation?: ZOrientation;
}
