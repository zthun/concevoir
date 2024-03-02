import { ZSizeFixed, createSizeChartVariedCss } from '@zthun/fashion-tailor';
import { ZFashionArea } from '@zthun/fashion-theme';
import { $attr, IZComponentRender, ZAttribute, ZComponentShadow } from '@zthun/helpful-dom';
import { css, html } from '@zthun/helpful-fn';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { IZComponentLoading } from '../component/component-loading.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { ZSuspenseRotateElement } from '../suspense/suspense-rotate-element.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export interface IZButton extends IZComponentFashion, IZComponentLoading, IZComponentName {
  borderless?: boolean;
  compact?: boolean;
  disabled?: boolean;
  outline?: boolean;
}

@ZComponentShadow({ name: 'ZButton', dependencies: [ZSuspenseRotateElement] })
export class ZButtonElement extends HTMLElement implements IZButton, IZComponentRender {
  public static readonly observedAttributes = ['borderless', 'compact', 'disabled', 'fashion', 'loading', 'outline'];
  public static readonly SizeChart = createSizeChartVariedCss();

  @ZAttribute({ type: 'boolean' })
  public borderless: boolean | undefined;

  @ZAttribute({ type: 'boolean' })
  public compact: boolean | undefined;

  @ZAttribute({ type: 'boolean' })
  public disabled: boolean | undefined;

  @ZAttribute({ fallback: ZFashionArea.Component })
  public fashion: string;

  @ZAttribute()
  public name: string | undefined;

  @ZAttribute({ type: 'boolean' })
  public loading: boolean | undefined;

  @ZAttribute({ type: 'boolean' })
  public outline: boolean | undefined;

  public render(shadow: ShadowRoot) {
    const { borderless, compact, disabled, fashion, loading, outline } = this;

    const detail = new ZFashionDetail(fashion);
    const gap = ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall);
    const padding = compact ? '0' : gap;
    const thickness = ZFashionTailorElement.thicknessVar(ZSizeFixed.Medium);

    const $css = css`
      button {
        align-items: center;
        background: ${outline ? 'transparent' : detail.color('main')};
        border-color: ${detail.color('main')};
        border-radius: 0.375rem;
        border-style: ${borderless ? 'none' : 'solid'};
        color: ${outline ? detail.color('main') : detail.color('contrast')};
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: ${gap};
        overflow: hidden;
        padding: ${padding};
        position: relative;
      }

      button:focus {
        border-color: ${detail.color('focus.main')};
        outline-color: ${detail.color('focus.border')};
        outline-style: solid;
        outline-width: ${thickness};
      }

      button:hover:not([disabled]) {
        background-color: ${detail.color('hover.main')};
        border-color: ${detail.color('hover.border')};
        color: ${detail.color('hover.contrast')};
        cursor: pointer;
      }

      button:active:not([disabled]) {
        background-color: ${detail.color('active.main')};
        border-color: ${detail.color('active.border')};
        color: ${detail.color('active.contrast')};
      }

      button:disabled {
        opacity: 0.25;
      }
    `;

    const $html = html`
      <button ${$attr('disabled', disabled)}>
        <slot name="prefix"></slot>
        <slot></slot>
        <z-suspense-rotate class="ZButton-loading" ${$attr('disabled', !loading)} ${$attr('fashion', fashion)}>
        </z-suspense-rotate>
      </button>
    `;

    const style = document.createElement('style');
    style.textContent = $css;
    const template = document.createElement('template');
    template.innerHTML = $html;

    shadow.appendChild(style);
    shadow.appendChild(template.content.cloneNode(true));
  }
}
