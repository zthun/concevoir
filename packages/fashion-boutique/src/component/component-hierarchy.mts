/**
 * Represents a component that can have children.
 */
export interface IZComponentHierarchy<T> {
  /**
   * The component children.
   */
  children?: T | T[];
}
