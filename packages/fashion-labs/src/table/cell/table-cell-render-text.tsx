import { ReactNode } from 'react';
import { IZTableCellRender } from './table-cell-render';

/**
 * Renders the value as raw text.
 */
export class ZTableCellRenderText implements IZTableCellRender<string> {
  public render(value: string): ReactNode {
    return String(value);
  }
}
