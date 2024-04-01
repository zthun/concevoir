import { ZFontFamily } from './font-family.mjs';
import { ZFontUnit } from './font-unit.mjs';

export interface IZFashionTypography {
  families: ZFontFamily[];
  unit: ZFontUnit;
  size: number;
}

export class ZFashionTypographyBuilder {
  private _typography: IZFashionTypography;

  public constructor() {
    this._typography = {
      families: [ZFontFamily.Roboto, ZFontFamily.Arial],
      unit: 'rem',
      size: 1
    };
  }

  public families(val: ZFontFamily[]): this {
    this._typography.families = val;
    return this;
  }

  public browser() {
    return this.families([]);
  }

  public family(family: ZFontFamily) {
    return this.families(this._typography.families.concat([family]));
  }

  public size(val: number): this {
    this._typography.size = val;
    return this;
  }

  public unit(val: ZFontUnit): this {
    this._typography.unit = val;
    return this;
  }

  public build(): IZFashionTypography {
    return structuredClone(this._typography);
  }
}
