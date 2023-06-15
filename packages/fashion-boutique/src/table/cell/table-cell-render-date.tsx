import { ReactNode } from 'react';
import { IZTableCellRender } from './table-cell-render';

/**
 * Renders the value as raw text.
 */
export class ZTableCellRenderDate implements IZTableCellRender<string | Date> {
  public render(value: string | Date): ReactNode {
    const date = new Date(String(value.toString()));
    return date.toLocaleDateString();
  }
}
