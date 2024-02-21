import { IZFashion, ZColor, ZFashionScope } from '@zthun/fashion-theme';
import { cssVariable } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { castArray, get } from 'lodash-es';
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
  fashion?: IZFashion | string;
}

export class ZFashionDetail {
  public static nameOf(fashion?: IZFashion) {
    return new ZFashionDetail(fashion).name();
  }

  public constructor(private _fashion?: IZFashion | string) {}

  public name() {
    return typeof this._fashion === 'string' ? this._fashion : this._fashion?.name;
  }

  public color(scope: ZFashionScope | ZFashionScope[], fallback: string): string {
    const $scopes = castArray(scope);
    const [$first] = $scopes;

    if (typeof this._fashion === 'string') {
      const globalColor = ZFashionThemeElement.property(this._fashion, $first);
      return cssVariable(globalColor);
    }

    const candidates = $scopes.map<ZColor>((s) => get(this._fashion, s) as any);
    const [first, ...rest] = candidates;

    let color: ZColor | undefined | null = firstDefined.apply<any, any, ZColor>(null, [null, first, ...rest]);

    if (color == null) {
      const globalColor = ZFashionThemeElement.property(fallback, $first);
      color = cssVariable(globalColor);
    }

    return color;
  }
}
