import { CSSInterpolation } from '../theme/css.mjs';

export type ZGenerateStaticCss = () => CSSInterpolation;
export type ZRefreshCssVariables = () => void;
