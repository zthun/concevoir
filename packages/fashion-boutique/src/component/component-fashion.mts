import { ZFashionScope } from '@zthun/fashion-theme';
import { castArray } from 'lodash-es';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';

/**
 * Represents a component that contains color.
 */
export interface IZComponentFashion {
  /**
   * The fashion for the component.
   */
  fashion?: string;
}

export class ZFashionDetail {
  public constructor(private _fashion: string) {}

  public color(scope: ZFashionScope | ZFashionScope[]): string {
    const $scopes = castArray(scope);
    const [$first] = $scopes;

    const globalColor = ZFashionThemeElement.property(this._fashion, $first);
    return `var(${globalColor})`;
  }
}
