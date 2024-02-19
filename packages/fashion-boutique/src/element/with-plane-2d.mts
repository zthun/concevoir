import { ZElementConstructor } from './element-constructor.mjs';
import { WithHeight, WithHeightAttributes } from './with-height.mjs';
import { WithWidth, WithWidthAttributes } from './with-width.mjs';

// This is mostly a helper that makes it much easier to combine width and height.

export const WithPlane2dAttributes = Object.freeze([...WithWidthAttributes, ...WithHeightAttributes]);

export function WithPlane2d<TWidth, THeight, TBase extends ZElementConstructor = ZElementConstructor>(Base: TBase) {
  const WithHeightElement = WithHeight<THeight>(Base);
  return WithWidth<TWidth, typeof WithHeightElement>(WithHeightElement);
}
