import { IZFashionTailor, ZGapSize, ZSizeFixed, ZSizeVoid, ZThicknessSize } from '@zthun/fashion-tailor';
import { cssVariable, registerCustomElement } from '@zthun/helpful-dom';

export class ZFashionTailorElement extends HTMLElement {
  public static register = registerCustomElement.bind(null, 'z-fashion-tailor', ZFashionTailorElement);

  public static gapProp(size: ZGapSize): string {
    return `--fashion-tailor-gap-${size}`;
  }

  public static gapVar(size: ZGapSize): string {
    return cssVariable(ZFashionTailorElement.gapProp(size));
  }

  public static thicknessProp(size: ZThicknessSize): string {
    return `--fashion-tailor-thickness-${size}`;
  }

  public static thicknessVar(size: ZThicknessSize): string {
    return cssVariable(ZFashionTailorElement.thicknessProp(size));
  }

  public applyTailor(tailor: IZFashionTailor): void {
    const setVariables = (s: ZSizeFixed | ZSizeVoid) => {
      this.style.setProperty(ZFashionTailorElement.gapProp(s), tailor.gap(s));
      this.style.setProperty(ZFashionTailorElement.thicknessProp(s), tailor.thickness(s));
    };

    Object.values(ZSizeFixed).forEach(setVariables);
    Object.values(ZSizeVoid).forEach(setVariables);
  }
}
