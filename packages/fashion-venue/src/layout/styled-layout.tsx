import { CSSInterpolation } from 'tss-react';
import { IZTheme } from '../theme/theme';

/**
 * Css style object.
 */
export type ZCss = CSSInterpolation;

export interface IZStyledLayout {
  globals: ZCss;
  theme: IZTheme;
}

export function ZStyledLayout() {}
