import { IZMetadata } from '@zthun/helpful-query';
import { ReactNode } from 'react';

/**
 * Represents an object responsible for rendering a value.
 */
export interface IZTableValueRender {
  /**
   * Constructs the node that renders the given value.
   *
   * @param value -
   *        The value to render.  This can be anything.
   *
   * @returns
   *        The node for rendering the value.
   */
  render(value: unknown, metadata: IZMetadata): ReactNode;
}
