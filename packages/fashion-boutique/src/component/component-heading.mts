/**
 * A component that contains a heading.
 */
export interface IZComponentHeading<T = string> {
  /**
   * The root heading.
   */
  heading?: T;

  /**
   * The sub heading that further describes the heading.
   */
  subHeading?: T;
}
