import { ReactNode } from 'react';
import { IZTableValueRender } from './table-value-render';

/**
 * Renders the value as raw text.
 */
export class ZTableValueRenderDate implements IZTableValueRender {
  public render(value: unknown): ReactNode {
    const date = new Date(String(value));
    return date.toLocaleDateString();
  }
}
