import { firstDefined } from '@zthun/helpful-fn';
import { css, CSSInterpolation } from '../theme/css.mjs';

export class ZFashionElement extends HTMLElement {
  public static readonly AttributeFashion = 'fashion';

  public readonly name?: string;

  public refreshCssVariables?: () => void;
  public generateStaticCss?: () => CSSInterpolation = undefined;

  public queryAttribute<T extends string = string>(name: string, fallback: T): T;
  public queryAttribute<T extends string = string>(name: string, fallback?: T): T | null {
    const fb = fallback || null;
    return firstDefined(fb, this.getAttribute(name) as T | null);
  }

  public connectedCallback() {
    this.refreshCssVariables && this.refreshCssVariables();
    this.name && this.classList.add(this.name);
    this.generateStaticCss && this.classList.add(css(this.generateStaticCss()));
  }

  public attributeChangedCallback() {
    this.refreshCssVariables && this.refreshCssVariables();
  }
}
