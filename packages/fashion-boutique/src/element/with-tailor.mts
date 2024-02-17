import { ZGapSize, ZThicknessSize } from '@zthun/fashion-tailor';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZFashionElementCtor } from './fashion-element.mjs';

export function WithTailor<TBase extends ZFashionElementCtor>(Base: TBase) {
  return class ZElementWithTailor extends Base {
    public gap(size: ZGapSize) {
      const property = ZFashionTailorElement.gapProperty(size);
      return this.cssVariable(property);
    }

    public thickness(thickness: ZThicknessSize) {
      const property = ZFashionTailorElement.thicknessProperty(thickness);
      return this.cssVariable(property);
    }
  };
}
