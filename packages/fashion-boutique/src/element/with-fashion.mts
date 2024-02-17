import { IZFashion, ZColor, ZFashionName, ZFashionScope } from '@zthun/fashion-theme';
import { ZFashionThemeElement } from 'src/theme/fashion-theme-element.mjs';
import { ZFashionElementCtor } from './fashion-element.mjs';

export function WithFashion<TBase extends ZFashionElementCtor>(Base: TBase) {
  return class ZElementWithFashion extends Base {
    _fashion: IZFashion | null | undefined = null;

    public get fashion() {
      return this._fashion;
    }

    public set fashion(val: IZFashion | null | undefined) {
      this._fashion = val;
      this.mutateAttribute('fashion', val?.name);
      this.refreshCssVariables?.call(this);
    }

    public color<TFashionName extends string = ZFashionName>(
      fromLocalFashion: (f: IZFashion) => ZColor,
      fallback: { scope: ZFashionScope; name: TFashionName }
    ): string {
      let color: ZColor | undefined | null = null;

      if (this.fashion != null) {
        color = fromLocalFashion(this.fashion);
      }

      if (color == null) {
        const name = this.queryAttribute('fashion', fallback.name);
        const globalColor = ZFashionThemeElement.property(name, fallback.scope);
        color = `var(${globalColor})`;
      }

      return color;
    }
  };
}
