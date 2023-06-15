import { ReactNode } from 'react';
import { IZTableValueRender } from './table-cell-render';

/**
 * Renders the value as raw text.
 */
export class ZTableValueRenderText implements IZTableValueRender {
  public render(value: unknown): ReactNode {
    return String(value);
  }
}
