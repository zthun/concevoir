import { CSSInterpolation, css } from '../theme/css.mjs';

export class ZFashionElement extends HTMLElement {
  public readonly name?: string;

  public refreshCssVariables?: () => void;
  public generateStaticCss?: () => CSSInterpolation = undefined;

  public connectedCallback() {
    this.name && this.classList.add(this.name);

    if (this.generateStaticCss) {
      this.classList.add(css(this.generateStaticCss()));
    }

    this.attributeChangedCallback();
  }

  public attributeChangedCallback() {
    this.refreshCssVariables?.call(this);
  }
}

export type ZFashionElementCtor<T extends ZFashionElement = ZFashionElement> = new (...args: any[]) => T;
