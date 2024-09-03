export type ZFontUnitAbsolute = "cm" | "mm" | "in" | "px" | "pt" | "pc";
export type ZFontUnitRelative =
  | "em"
  | "ex"
  | "ch"
  | "rem"
  | "vw"
  | "vh"
  | "vmin"
  | "vmax"
  | "%";
export type ZFontUnit = ZFontUnitAbsolute | ZFontUnitRelative;
