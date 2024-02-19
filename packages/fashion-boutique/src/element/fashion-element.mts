import { CSSInterpolation, css } from '../theme/css.mjs';
import { ZRefreshCssVariables } from './with-css-lifecycle.mjs';

export class ZFashionElement extends HTMLElement {
  public readonly name?: string;

  public refreshCssVariables?: ZRefreshCssVariables;
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

export type ZElementConstructor<T extends Element = Element> = new (...args: any[]) => T;
export type ZFashionElementCtor<T extends ZFashionElement = ZFashionElement> = new (...args: any[]) => T;
