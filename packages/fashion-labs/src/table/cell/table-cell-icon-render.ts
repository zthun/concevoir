import { IZMetadata } from '@zthun/helpful-query';
import { ReactNode } from 'react';

/**
 * Renders an icon given a name.
 */
export interface IZTableCellIconRender {
  /**
   * Renders the icon.
   *
   * @param name -
   *        The icon name.
   * @param metadata -
   *        The metadata for the icon.
   */
  render(name: string, metadata: IZMetadata): ReactNode;
}
