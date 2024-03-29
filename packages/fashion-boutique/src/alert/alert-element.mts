import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { html } from '@zthun/helpful-fn';
import {
  IZComponentTemplate,
  ZAttribute,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

@ZComponentRegister('z-alert')
@ZComponentRenderTemplate()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentShadow()
export class ZAlertElement extends HTMLElement implements IZComponentFashion, IZComponentName, IZComponentTemplate {
  public static readonly observedAttributes = ['fashion'];

  @ZAttribute()
  public name?: string;

  @ZAttribute({ fallback: ZFashionPriority.Primary })
  public fashion: string;

  public template() {
    const { fashion } = this;

    const detail = new ZFashionDetail(fashion);

    const boxWidth = ZFashionTailorElement.thicknessVar(ZSizeFixed.ExtraSmall);
    const boxShadow = detail.color('border');
    const padX = ZFashionTailorElement.gapVar(ZSizeFixed.Small);
    const padY = ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall);

    return html`
      <style>
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
      </style>
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
  }
}
