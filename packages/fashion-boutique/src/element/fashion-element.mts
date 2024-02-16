import { css, CSSInterpolation } from '../theme/css.mjs';

export abstract class ZFashionElement extends HTMLElement {
  public abstract readonly name: string;

  protected abstract generateStaticCss?(): CSSInterpolation;
  protected abstract refreshCssVariables?(): void;

  public connectedCallback() {
    this.refreshCssVariables && this.refreshCssVariables();
    this.classList.add(this.name);
    this.generateStaticCss && this.classList.add(css(this.generateStaticCss()));
  }

  public attributeChangedCallback() {
    this.refreshCssVariables && this.refreshCssVariables();
  }
}
