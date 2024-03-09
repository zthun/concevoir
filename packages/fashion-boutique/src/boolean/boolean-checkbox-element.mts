import { ZCircusKeyboardQwerty } from '@zthun/cirque';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionArea, ZFashionPriority, rgb } from '@zthun/fashion-theme';
import {
  $attr,
  IZComponentConnected,
  IZComponentDisconnected,
  IZComponentStyles,
  IZComponentTemplate,
  ZAttribute,
  ZComponentShadow
} from '@zthun/helpful-dom';
import { ZTrilean, css, html, sleep, trilean } from '@zthun/helpful-fn';
import { IZComponentDisabled } from '../component/component-disabled.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentRequired } from '../component/component-required.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export type ZBooleanTriStateValue = 'true' | 'false' | 'indeterminate';

@ZComponentShadow({ name: 'ZBooleanCheckbox', className: ['ZBoolean-root', 'ZBoolean-checkbox'] })
export class ZBooleanCheckboxElement
  extends HTMLElement
  implements
    IZComponentTemplate,
    IZComponentStyles,
    IZComponentConnected,
    IZComponentFashion,
    IZComponentRequired,
    IZComponentName,
    IZComponentDisabled,
    IZComponentDisconnected
{
  public static readonly observedAttributes = ['fashion', 'value', 'disabled', 'required'];

  @ZAttribute({ type: 'boolean' })
  public required: boolean;

  @ZAttribute({ type: 'boolean' })
  public disabled: boolean;

  @ZAttribute({ fallback: ZFashionPriority.Primary })
  public fashion: string;

  @ZAttribute({ type: 'trilean' })
  public value: trilean;

  @ZAttribute()
  public name: string;

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

  private _handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key !== ZCircusKeyboardQwerty.enter.lower && e.key !== ZCircusKeyboardQwerty.space.lower) {
      return;
    }

    e.preventDefault();
    await this._handleClick();
  };

  private _handleClick = async () => {
    const { disabled } = this;

    if (disabled) {
      return;
    }

    const { value } = this;
    this.value = ZTrilean.isIndeterminate(value) ? true : !value;
    this.dispatchEvent(new Event('change', { composed: true, bubbles: true }));
    await sleep();
    this.shadowRoot?.querySelector<HTMLElement>('[role="checkbox"]')?.focus();
  };

  public connectedCallback(): void {
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  public disconnectedCallback(): void {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
  }
}
