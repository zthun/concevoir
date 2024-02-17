import { firstDefined } from '@zthun/helpful-fn';
import { css, CSSInterpolation } from '../theme/css.mjs';

export class ZFashionElement extends HTMLElement {
  public readonly name?: string;

  public refreshCssVariables?: () => void;
  public generateStaticCss?: () => CSSInterpolation = undefined;

  public mutateAttribute<T extends string = string>(name: string, val: T | null | undefined): void {
    val == null ? this.removeAttribute(name) : this.setAttribute(name, val);
  }

  public queryAttribute<T extends string = string>(name: string, fallback: T): T {
    return firstDefined(fallback, this.getAttribute(name) as T);
  }

  public connectedCallback() {
    this.refreshCssVariables?.call(this);
    this.name && this.classList.add(this.name);

    if (this.generateStaticCss) {
      this.classList.add(css(this.generateStaticCss()));
    }
  }

  public attributeChangedCallback() {
    this.refreshCssVariables?.call(this);
  }
}

export type ZFashionElementCtor<T extends ZFashionElement = ZFashionElement> = new (...args: any[]) => T;
