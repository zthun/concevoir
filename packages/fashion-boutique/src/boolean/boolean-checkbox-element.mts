import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionArea, rgb } from '@zthun/fashion-theme';
import { $attr, IZComponentStyles, IZComponentTemplate, ZAttribute, ZComponentShadow } from '@zthun/helpful-dom';
import { ZTrilean, css, html, trilean } from '@zthun/helpful-fn';
import { ZFashionDetail } from '../component/component-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZBooleanElement } from './boolean-element.mjs';

@ZComponentShadow({ name: 'ZBooleanCheckbox', className: ['ZBoolean-root', 'ZBoolean-checkbox'] })
export class ZBooleanCheckboxElement
  extends ZBooleanElement<trilean>
  implements IZComponentTemplate, IZComponentStyles
{
  @ZAttribute({ type: 'trilean' })
  public value: trilean;

  public styles() {
    const { fashion, required, disabled, value } = this;

    const detail = new ZFashionDetail(fashion);
    const component = new ZFashionDetail(ZFashionArea.Component);

    return css`
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
    `;
  }

  public template() {
    const { value, disabled } = this;
    const content = ZTrilean.isIndeterminate(value) ? '-' : value ? '&#x2714' : '';
    const tab = $attr('tabindex', disabled ? undefined : 0);

    return html`
      <label>
        <div role="checkbox" ${tab} data-disabled=${disabled}>${content}</div>
        <slot></slot>
      </label>
    `;
  }

  public toggle() {
    const { value } = this;
    this.value = ZTrilean.isIndeterminate(value) ? true : !value;
  }
}
