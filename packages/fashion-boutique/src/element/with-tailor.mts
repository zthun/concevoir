import { ZGapSize, ZThicknessSize } from '@zthun/fashion-tailor';
import { cssVariable } from '@zthun/helpful-dom';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZElementConstructor } from './fashion-element.mjs';

export function WithTailor<TBase extends ZElementConstructor>(Base: TBase) {
  return class ZElementWithTailor extends Base {
    public gap(size: ZGapSize) {
      const property = ZFashionTailorElement.gapProperty(size);
      return cssVariable(property);
    }

    public thickness(thickness: ZThicknessSize) {
      const property = ZFashionTailorElement.thicknessProperty(thickness);
      return cssVariable(property);
    }
  };
}
