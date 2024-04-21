import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionArea, rgb } from '@zthun/fashion-theme';
import { html } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  IZComponentTemplate,
  ZAttribute,
  ZAttributes,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZTrilean, trilean } from '@zthun/trilean';
import { ZFashionDetail } from '../component/component-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZBooleanElement } from './boolean-element.mjs';

export interface ZBooleanCheckboxElement extends IZComponentRender {}

@ZComponentRegister('z-boolean-checkbox')
@ZComponentClass('ZBoolean-root', 'ZBoolean-checkbox')
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentShadow()
export class ZBooleanCheckboxElement extends ZBooleanElement<trilean> implements IZComponentTemplate {
  @ZAttribute({ type: 'trilean' })
  public value: trilean;

  public template() {
    const { fashion, value, disabled, required } = this;

    const detail = new ZFashionDetail(fashion);
    const component = new ZFashionDetail(ZFashionArea.Component);

    const content = ZTrilean.isIndeterminate(value) ? '-' : value ? '&#x2714' : '';
    const tab = ZAttributes.stringify('tabindex', disabled ? undefined : 0);

    return html`
      <style>
        label {
          cursor: ${disabled ? 'normal' : 'pointer'};
          position: relative;
          opacity: ${disabled ? 0.25 : 1};
          font-family: 'Roboto', 'Arial', 'sans-serif';
          white-space: nowrap;
        }

        label::after {
          color: ${rgb(220, 53, 69)};
          content: ${required ? '"*"' : '""'};
          vertical-align: middle;
        }

        [role='checkbox'] {
          background-color: ${value !== false ? detail.color('main') : component.color('main')};
          border-radius: ${ZFashionTailorElement.thicknessVar(ZSizeFixed.Large)};
          color: ${detail.color('contrast')};
          display: inline-block;
          margin-bottom: 0.16rem;
          min-height: 1.2rem;
          min-width: 1rem;
          padding: 0.1rem;
          text-align: center;
          vertical-align: middle;
        }

        [role='checkbox']:focus {
          box-shadow: 0 0 0 0.1rem ${detail.color('focus.border')};
          outline: none;
        }

        :host(:hover) [role='checkbox'][data-disabled='false'] {
          box-shadow: 0 0 0 0.1rem ${detail.color('hover.border')};
        }
      </style>
      <label>
        <div role="checkbox" ${tab} data-disabled=${disabled}>${content}</div>
        <slot></slot>
      </label>
    `;
  }

  public async toggle() {
    const { value } = this;
    this.value = ZTrilean.isIndeterminate(value) ? true : !value;
  }
}
