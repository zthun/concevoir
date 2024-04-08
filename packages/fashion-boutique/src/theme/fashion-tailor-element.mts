import {
  IZFashionTailor,
  ZFashionTailor,
  ZGapSize,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
  ZThicknessSize
} from '@zthun/fashion-tailor';
import { ZProperty } from '@zthun/helpful-dom';
import { css } from '@zthun/helpful-fn';
import { ZComponentStyle } from './component-style.mjs';

export interface IZFashionTailorElement {
  render(): void;
}

@ZComponentStyle({ name: 'ZFashionTailor' })
export class ZFashionTailorElement extends HTMLElement {
  public static gapProp(size: ZGapSize | ZSizeVaried.Fit): string {
    return `--fashion-tailor-gap-${size}`;
  }

  public static gapVar(size: ZGapSize | ZSizeVaried.Fit): string {
    return `var(${ZFashionTailorElement.gapProp(size)})`;
  }

  public static thicknessProp(size: ZThicknessSize): string {
    return `--fashion-tailor-thickness-${size}`;
  }

  public static thicknessVar(size: ZThicknessSize): string {
    return `var(${ZFashionTailorElement.thicknessProp(size)})`;
  }

  @ZProperty({ initial: new ZFashionTailor() })
  public tailor: IZFashionTailor;

  public styles() {
    return css`
      html {
        ${ZFashionTailorElement.gapProp(ZSizeFixed.ExtraSmall)}: ${this.tailor.gap(ZSizeFixed.ExtraSmall)};
        ${ZFashionTailorElement.gapProp(ZSizeFixed.Small)}: ${this.tailor.gap(ZSizeFixed.Small)};
        ${ZFashionTailorElement.gapProp(ZSizeFixed.Medium)}: ${this.tailor.gap(ZSizeFixed.Medium)};
        ${ZFashionTailorElement.gapProp(ZSizeFixed.Large)}: ${this.tailor.gap(ZSizeFixed.Large)};
        ${ZFashionTailorElement.gapProp(ZSizeFixed.ExtraLarge)}: ${this.tailor.gap(ZSizeFixed.ExtraLarge)};
        ${ZFashionTailorElement.gapProp(ZSizeVoid.None)}: ${this.tailor.gap(ZSizeVoid.None)};
        --fashion-tailor-gap-auto: auto;

        ${ZFashionTailorElement.thicknessProp(ZSizeFixed.ExtraSmall)}: ${this.tailor.thickness(ZSizeFixed.ExtraSmall)};
        ${ZFashionTailorElement.thicknessProp(ZSizeFixed.Small)}: ${this.tailor.thickness(ZSizeFixed.Small)};
        ${ZFashionTailorElement.thicknessProp(ZSizeFixed.Medium)}: ${this.tailor.thickness(ZSizeFixed.Medium)};
        ${ZFashionTailorElement.thicknessProp(ZSizeFixed.Large)}: ${this.tailor.thickness(ZSizeFixed.Large)};
        ${ZFashionTailorElement.thicknessProp(ZSizeFixed.ExtraLarge)}: ${this.tailor.thickness(ZSizeFixed.ExtraLarge)};
        ${ZFashionTailorElement.thicknessProp(ZSizeVoid.None)}: ${this.tailor.thickness(ZSizeVoid.None)};

        --fashion-tailor-full: 100%;
      }
    `;
  }

  public applyTailor(tailor: IZFashionTailor): void {
    this.tailor = tailor;
  }
}
