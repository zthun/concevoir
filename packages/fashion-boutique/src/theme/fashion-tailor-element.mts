import { IZFashionTailor, ZGapSize, ZSizeFixed, ZSizeVoid, ZThicknessSize } from '@zthun/fashion-tailor';
import { registerCustomElement } from '@zthun/helpful-dom';

export class ZFashionTailorElement extends HTMLElement {
  public static register = registerCustomElement.bind(null, 'z-fashion-tailor', ZFashionTailorElement);

  public static gapProperty(size: ZGapSize): string {
    return `--fashion-tailor-gap-${size}`;
  }

  public static thicknessProperty(size: ZThicknessSize): string {
    return `--fashion-tailor-thickness-${size}`;
  }

  public applyTailor(tailor: IZFashionTailor): void {
    const setVariables = (s: ZSizeFixed | ZSizeVoid) => {
      this.style.setProperty(ZFashionTailorElement.gapProperty(s), tailor.gap(s));
      this.style.setProperty(ZFashionTailorElement.thicknessProperty(s), tailor.thickness(s));
    };

    Object.values(ZSizeFixed).forEach(setVariables);
    Object.values(ZSizeVoid).forEach(setVariables);
  }
}
