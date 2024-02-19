import { IZFashion, ZColor, ZFashionName, ZFashionScope } from '@zthun/fashion-theme';
import { cssVariable, mutateAttribute, queryAttribute } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { castArray, get } from 'lodash-es';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';
import { ZElementConstructor } from './element-constructor.mjs';

export interface IZWithFashion {
  fashion: IZFashion | null | undefined;
}

export const WithFashionAttributes = Object.freeze(['data-fashion']);

export function WithFashion<TBase extends ZElementConstructor>(Base: TBase) {
  return class ZElementWithFashion extends Base implements IZWithFashion {
    _fashion: IZFashion | null | undefined = null;

    public get fashion() {
      return this._fashion;
    }

    public set fashion(val: IZFashion | null | undefined) {
      this._fashion = val;
      mutateAttribute(this, 'data-fashion', val?.name);
    }

    public color<TFashionName extends string = ZFashionName>(
      scope: ZFashionScope | ZFashionScope[],
      fallback: TFashionName
    ): string {
      const $scopes = castArray(scope);
      const candidates = $scopes.map<ZColor>((s) => get<IZFashion | null | undefined, string>(this.fashion, s));
      const [first, ...rest] = candidates;

      let color: ZColor | undefined | null = firstDefined.apply<any, any, ZColor>(null, [null, first, ...rest]);

      if (color == null) {
        const [$first] = $scopes;
        const name = queryAttribute(this, 'data-fashion', fallback);
        const globalColor = ZFashionThemeElement.property(name, $first);
        color = cssVariable(globalColor);
      }

      return color;
    }
  };
}
