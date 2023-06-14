import { ReactNode } from 'react';
import { IZTableValueRender } from './table-value-render';

/**
 * Renders the value as raw text.
 */
export class ZTableValueRenderText implements IZTableValueRender {
  public render(value: unknown): ReactNode {
    return String(value);
  }
}
