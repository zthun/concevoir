import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { ZAttribute, ZComponentShadow } from '@zthun/helpful-dom';
import { css, html } from '@zthun/helpful-fn';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

@ZComponentShadow({ name: 'ZAlert' })
export class ZAlertElement extends HTMLElement implements IZComponentFashion, IZComponentName {
  public static readonly observedAttributes = ['fashion'];

  @ZAttribute()
  public name?: string;

  @ZAttribute({ fallback: ZFashionPriority.Primary })
  public fashion: string;

  public render(shadow: ShadowRoot) {
    const { fashion } = this;

    const detail = new ZFashionDetail(fashion);

    const boxWidth = ZFashionTailorElement.thicknessVar(ZSizeFixed.ExtraSmall);
    const boxShadow = detail.color('border');
    const padX = ZFashionTailorElement.gapVar(ZSizeFixed.Small);
    const padY = ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall);
    const $css = css`
      :host {
        align-items: center;
        background: ${detail.color('main')};
        border-color: ${detail.color('border')};
        border-radius: ${ZFashionTailorElement.thicknessVar(ZSizeFixed.Medium)};
        border-style: double;
        box-shadow: 0 0 0 ${boxWidth} ${boxShadow};
        color: ${detail.color('contrast')};
        display: grid;
        grid-template-columns: auto auto 1fr;
        grid-template-areas:
          'avatar heading .'
          'avatar message .';
        padding: ${padX} ${padY};
      }

      .ZAlert-avatar {
        grid-area: avatar;
        margin-right: ${ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)};
      }

      .ZAlert-heading {
        grid-area: heading;
        margin-bottom: calc(${ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)} / 2);
      }

      .ZAlert-message {
        grid-area: message;
      }
    `;

    const $html = html`
      <div class="ZAlert-avatar">
        <slot name="avatar"></slot>
      </div>
      <div class="ZAlert-heading">
        <slot name="heading"></slot>
      </div>
      <div class="ZAlert-message">
        <slot name="message"></slot>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = $css;

    const template = document.createElement('template');
    template.innerHTML = $html;

    shadow.appendChild(style);
    shadow.appendChild(template.content.cloneNode(true));
  }
}
