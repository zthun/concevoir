export type ZUnitAbsolute = 'cm' | 'mm' | 'in' | 'px' | 'pt' | 'pc';
export type ZUnitRelative = 'em' | 'ex' | 'ch' | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax' | '%';
export type ZUnit = ZUnitAbsolute | ZUnitRelative;

export interface IZComponentFont {
  family?: string;
  size?: number;
  unit?: ZUnit;
}
