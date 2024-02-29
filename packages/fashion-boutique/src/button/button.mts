import { ZSizeFixed, createSizeChartVariedCss } from '@zthun/fashion-tailor';
import { ZFashionArea } from '@zthun/fashion-theme';
import {
  IZComponentAttributeChanged,
  IZComponentConnected,
  ZAttribute,
  registerCustomElement
} from '@zthun/helpful-dom';
import { ZFashionDetail } from '../component/component-fashion.mjs';
import { IZComponentLoading } from '../component/component-loading.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { ZSuspenseRotateElement } from '../suspense/suspense-rotate-element.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export class ZButtonElement
  extends HTMLElement
  implements IZComponentConnected, IZComponentAttributeChanged, IZComponentLoading
{
  public static readonly register = registerCustomElement.bind(null, 'z-button', ZButtonElement);
  public static readonly observedAttributes = ['borderless', 'compact', 'disabled', 'fashion', 'loading', 'outline'];
  public static readonly SizeChart = createSizeChartVariedCss();

  @ZAttribute({ type: 'boolean' })
  public borderless?: boolean;

  @ZAttribute({ type: 'boolean' })
  public compact?: boolean;

  @ZAttribute({ type: 'boolean' })
  public disabled?: boolean;

  @ZAttribute({ fallback: ZFashionArea.Component })
  public fashion: string;

  @ZAttribute({ type: 'boolean' })
  public loading?: boolean;

  @ZAttribute({ type: 'boolean' })
  public outline?: boolean;

  public constructor() {
    super();

    ZSuspenseRotateElement.register();

    const shadow = this.attachShadow({ mode: 'open' });
    this._refreshStyles(shadow);
    this._refreshTemplate(shadow);
  }

  private _refreshTemplate(shadow: ShadowRoot) {
    const btn = shadow.querySelector('button');
    btn?.remove();

    const { loading, fashion } = this;

    const disabled = this.disabled ? 'disabled' : '';

    const template = document.createElement('template');
    template.innerHTML = `
      <button ${disabled}>
        <span class="pulse"></span>
        <slot name='prefix'></slot>
        <slot></slot>
        <z-suspense-rotate class="ZButton-loading" loading="${!!loading}"  fashion="${fashion}">
        </z-suspense-rotate>
      </button>
    `;

    shadow.appendChild(template.content.cloneNode(true));
  }

  private _refreshStyles(shadow: ShadowRoot) {
    let style = shadow.querySelector<HTMLStyleElement>('style');
    style?.remove();

    const { borderless, compact, fashion, outline } = this;

    const detail = new ZFashionDetail(fashion);
    const gap = ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall);
    const padding = compact ? '0' : gap;
    const thickness = ZFashionTailorElement.thicknessVar(ZSizeFixed.Medium);

    const css = new ZCssSerialize().serialize({
      '@keyframes pulse': {
        from: {
          transform: 'scale(0)'
        },
        to: {
          transform: 'scale(1)'
        }
      },
      ':host': {
        button: {
          'alignItems': 'center',
          'background': outline ? 'transparent' : detail.color('main'),
          'borderRadius': '0.375rem',
          // By design use main so we can get a double border
          // on focus.
          'borderColor': detail.color('main'),
          'borderStyle': borderless ? 'none' : 'solid',
          'color': outline ? detail.color('main') : detail.color('contrast'),
          'display': 'grid',
          'gridTemplateColumns': 'auto 1fr auto',
          'gap': gap,
          'overflow': 'hidden',
          'padding': `calc(${padding} / 2) ${padding}`,
          'position': 'relative',

          '.pulse': {
            backgroundColor: detail.color('focus.main'),
            borderColor: detail.color('focus.border'),
            borderRadius: '50%',
            color: detail.color('focus.contrast'),
            opacity: 0.5,
            position: 'absolute',
            left: -50,
            top: -50,
            right: -50,
            bottom: -50,
            transform: 'scale(0)'
          },

          '&:focus': {
            outlineStyle: 'solid',
            // Might look a little confusing here but the border color we want
            // to use the main focus and the border color for the outline.  This
            // gives us a nice double border.
            borderColor: detail.color('focus.main'),
            outlineColor: detail.color('focus.border'),
            outlineWidth: thickness
          },

          '&:hover:not([disabled])': {
            backgroundColor: detail.color('hover.main'),
            borderColor: detail.color('hover.border'),
            color: detail.color('hover.contrast'),
            cursor: 'pointer'
          },

          '&:active:not([disabled])': {
            backgroundColor: detail.color('active.main'),
            borderColor: detail.color('active.border'),
            color: detail.color('active.contrast')
          },

          '&:disabled': {
            opacity: 0.25
          }
        }
      }
    });

    style = document.createElement('style');
    style.textContent = css;

    shadow.appendChild(style);
  }

  public connectedCallback(): void {
    this.classList.add('ZButton-root');

    this._refreshTemplate(this.shadowRoot!);
  }

  public attributeChangedCallback(): void {
    this._refreshStyles(this.shadowRoot!);
    this._refreshTemplate(this.shadowRoot!);
  }
}
