import { CSSInterpolation } from '@emotion/serialize';

export type ZGlobalsWithVars = `var(--${string})` | `var(--${string}, ${string | number})`;

export type ZCssProperties<T extends CSSInterpolation = CSSInterpolation> = {
  [P in keyof T]: T[P] | ZGlobalsWithVars;
};
