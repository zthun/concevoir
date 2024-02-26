import { ZFashionScope } from '@zthun/fashion-theme';
import { cssVariable } from '@zthun/helpful-dom';
import { castArray } from 'lodash-es';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';

/**
 * Represents a component that contains color.
 */
export interface IZComponentFashion {
  /**
   * The fashion for the component.
   *
   * This can be an entire fashion or
   * the name of the fashion.
   */
  fashion?: string;
}

export class ZFashionDetail {
  public constructor(private _fashion: string) {}

  public color(scope: ZFashionScope | ZFashionScope[]): string {
    const $scopes = castArray(scope);
    const [$first] = $scopes;

    const globalColor = ZFashionThemeElement.property(this._fashion, $first);
    return cssVariable(globalColor);
  }
}
