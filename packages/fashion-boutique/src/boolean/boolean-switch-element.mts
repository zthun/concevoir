import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionArea, rgb } from '@zthun/fashion-theme';
import { $attr, IZComponentStyles, IZComponentTemplate, ZAttribute, ZComponentShadow } from '@zthun/helpful-dom';
import { css, html, sleep } from '@zthun/helpful-fn';
import { ZFashionDetail } from '../component/component-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZBooleanElement } from './boolean-element.mjs';

@ZComponentShadow({ name: 'ZBooleanSwitch', className: ['ZBoolean-root', 'ZBoolean-switch'] })
export class ZBooleanSwitchElement extends ZBooleanElement<boolean> implements IZComponentTemplate, IZComponentStyles {
  @ZAttribute({ type: 'boolean' })
  public value: boolean;

  public styles() {
    const { fashion, required, disabled, value } = this;

    const _fashion = new ZFashionDetail(fashion);
    const _component = new ZFashionDetail(ZFashionArea.Component);
    const detail = value ? _fashion : _component;

    return css`
      @keyframes scroll-on {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(50%);
        }
      }

      @keyframes scroll-off {
        from {
          transform: translateX(50%);
        }

        to {
          transform: translateX(0);
        }
      }

      label {
        align-items: center;
        cursor: ${disabled ? 'normal' : 'pointer'};
        display: inline-flex;
        flex-wrap: nowrap;
        gap: ${ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)};
        opacity: ${disabled ? 0.25 : 1};
      }

      label::after {
        color: ${rgb(220, 53, 69)};
        content: ${required ? '"*"' : '""'};
        margin-left: calc(${ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)} * -0.5);
        vertical-align: middle;
      }

      label:hover .slider {
        background-color: ${detail.color('hover.main')};
      }

      .switch {
        align-items: center;
        background-color: ${detail.color('light')};
        border-radius: calc(${ZFashionTailorElement.thicknessVar(ZSizeFixed.ExtraLarge)} * 2);
        display: flex;
        height: 0.3rem;
        padding: calc(${ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)} / 2);
        width: 2.25rem;
      }

      .switch:focus {
        outline: none;
      }

      .switch:focus .slider {
        box-shadow: 0 0 0.16rem 0.25rem ${detail.color('focus.main')};
      }

      .slider {
        animation-duration: 0.1s;
        animation-iteration-count: 1;
        animation-timing-function: linear;
        background-color: ${detail.color('main')};
        border-radius: 50%;
        height: 1.5rem;
        transform: translateX(${value ? '50%' : 0});
        width: 1.5rem;
      }
    `;
  }

  public template() {
    const { disabled } = this;
    const tab = $attr('tabindex', disabled ? undefined : 0);

    return html`
      <label>
        <div class="switch" ${tab} role="checkbox">
          <span class="slider"></span>
        </div>
        <slot></slot>
      </label>
    `;
  }

  public async toggle() {
    const next = !this.value;
    const slider = this.shadowRoot!.querySelector<HTMLElement>('.slider')!;
    slider.style.animationName = `${next ? 'scroll-on' : 'scroll-off'}`;
    slider.style.transform = `translateX(${next ? '50%' : 0})`;
    await sleep(110);
    this.value = !this.value;
  }
}
