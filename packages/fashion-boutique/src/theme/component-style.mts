import {
  IZComponentAttributeChanged,
  IZComponentConnected,
  IZComponentDisconnected,
  IZComponentPropertyChanged,
  IZComponentRender,
  IZComponentShadowOptions,
  registerCustomElement
} from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { castArray, kebabCase } from 'lodash-es';

/**
 * Options for a style component.
 */
export interface IZComponentStyleOptions extends IZComponentShadowOptions {}

/**
 * A mixin decorator that extends a WebComponent and adds a standard flow.
 *
 * The component will be registered with the custom elements registry. In order for
 * the component to actually render anything, it needs to implement
 * {@link IZComponentRender}
 *
 * @param options -
 *        The options for the custom component.
 *
 * @returns
 *        A new decorated type that automatically implements
 *        {@link IZComponentAttributeChanged} and {@link IZComponentConnected}
 *        and {@link IZComponentPropertyChanged}.
 */
export function ZComponentStyle(options: IZComponentStyleOptions) {
  const { className, listen, name, tag } = options;

  const $className = castArray(firstDefined(`${name}-root`, className));
  const $tag = firstDefined(kebabCase(name), tag);

  return function <C extends typeof HTMLElement>(Target: C) {
    const _Target = Target as any;

    const K: any = class
      extends _Target
      implements
        IZComponentAttributeChanged,
        IZComponentConnected,
        IZComponentDisconnected,
        IZComponentPropertyChanged,
        IZComponentRender
    {
      _handleListen = () => {
        this.render();
      };

      _style: HTMLElement;

      public render() {
        const $css = this.styles?.call(this);
        this._style.textContent = firstDefined('', $css);
      }

      public connectedCallback() {
        super.connectedCallback?.call(this);
        this._style = document.createElement('style');
        $className.forEach(($class) => this._style.classList.add($class));

        listen?.forEach((t) => {
          const { selector, event = 'change' } = t;
          const element = this.querySelector(selector);
          element?.addEventListener(event, this._handleListen);
        });

        document.head.appendChild(this._style);

        this.render();
      }

      public disconnectedCallback() {
        super.disconnectedCallback?.call(this);
        listen?.forEach((t) => {
          const { selector, event = 'change' } = t;
          const element = this.querySelector(selector);
          element?.removeEventListener(event, this._handleListen);
        });

        this._style.remove();
      }

      public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        super.attributeChangedCallback?.call(this, name, oldValue, newValue);
        this.render();
      }

      public propertyChangedCallback(name: string | symbol, oldValue: any, newValue: any): void {
        super.propertyChangedCallback?.call(this, name, oldValue, newValue);
        this.render();
      }
    };

    registerCustomElement($tag, K);

    return K;
  };
}
