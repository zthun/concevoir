import {
  IZComponentAttributeChanged,
  IZComponentConnected,
  IZComponentDisconnected,
  IZComponentPropertyChanged,
  IZComponentShadowOptions,
  includeCustomElement,
  registerCustomElement
} from '@zthun/helpful-dom';
import { css, firstDefined } from '@zthun/helpful-fn';
import { kebabCase } from 'lodash-es';

export function ZComponentBackground(options: IZComponentShadowOptions) {
  const { name, tag, dependencies } = options;

  const $tag = firstDefined(kebabCase(name), tag);

  dependencies?.forEach((d) => includeCustomElement(d));

  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;

    const K: any = class extends _Target implements IZComponentAttributeChanged, IZComponentPropertyChanged {
      public constructor() {
        super();

        const $css = css`
          :host {
            display: none;
          }
        `;

        const style = document.createElement('style');
        style.textContent = $css;

        const shadow = this.attachShadow({ mode: 'closed' });
        shadow.appendChild(style);
      }

      public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        super.attributeChangedCallback?.call(this, name, oldValue, newValue);
        const e = new Event('change');
        this.dispatchEvent(e);
      }

      public propertyChangedCallback(name: string | symbol, oldValue: any, newValue: any): void {
        super.propertyChangedCallback?.call(this, name, oldValue, newValue);
        const e = new Event('change');
        this.dispatchEvent(e);
      }
    };

    registerCustomElement($tag, K);

    return K;
  };
}

export interface IZComponentBackgroundListenOptions {
  selectors: string[];
}

export function ZComponentBackgroundListen(options: IZComponentBackgroundListenOptions) {
  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;
    const { selectors } = options;

    const K: any = class extends _Target implements IZComponentConnected, IZComponentDisconnected {
      _handleChange() {
        while (this.shadowRoot!.firstChild) {
          this.shadowRoot!.firstChild.remove();
        }

        this.render?.call(this, this.shadowRoot!);
      }

      public connectedCallback() {
        super.connectedCallback?.call(this);

        selectors.forEach((selector) => {
          const element = this.querySelector(selector);
          element?.addEventListener('change', this._handleChange);
        });
      }

      public disconnectedCallback() {
        super.disconnectedCallback?.call(this);
        selectors.forEach((selector) => {
          const element = this.querySelector(selector);
          element?.removeEventListener('change', this._handleChange);
        });
      }
    };

    return K;
  };
}
