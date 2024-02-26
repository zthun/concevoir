import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import {
  IZComponentAttributeChanged,
  IZComponentConnected,
  ZAttribute,
  cssVariable,
  registerCustomElement
} from '@zthun/helpful-dom';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export class ZAlertElement
  extends HTMLElement
  implements IZComponentConnected, IZComponentAttributeChanged, IZComponentFashion, IZComponentName
{
  public static readonly register = registerCustomElement.bind(null, 'z-alert', ZAlertElement);
  public static readonly observedAttributes = ['fashion'];

  @ZAttribute()
  public name?: string;

  @ZAttribute({ fallback: ZFashionPriority.Primary })
  public fashion: string;

  public constructor() {
    super();

    const css = new ZCssSerialize().serialize({
      ':host': {
        alignItems: 'center',
        background: `${cssVariable('--alert-background')}`,
        borderColor: `${cssVariable('--alert-border-color')}`,
        borderRadius: ZFashionTailorElement.thicknessVar(ZSizeFixed.ExtraLarge),
        borderStyle: 'double',
        borderWidth: ZFashionTailorElement.thicknessVar(ZSizeFixed.Medium),
        boxShadow: `${cssVariable('--alert-box-shadow')}`,
        color: `${cssVariable('--alert-color')}`,
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr',
        gridTemplateAreas: `
          "avatar heading ."
          "avatar message ."
        `,
        paddingBottom: ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall),
        paddingLeft: ZFashionTailorElement.gapVar(ZSizeFixed.Small),
        paddingRight: ZFashionTailorElement.gapVar(ZSizeFixed.Small),
        paddingTop: ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)
      },

      ':host .ZAlert-avatar': {
        gridArea: 'avatar',
        marginRight: ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)
      },

      ':host .ZAlert-heading': {
        gridArea: 'heading',
        marginBottom: `calc(${ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)} / 2)`
      },

      ':host .ZAlert-message': {
        gridArea: 'message'
      }
    });

    const avatar = document.createElement('div');
    avatar.classList.add('ZAlert-avatar');
    const $avatar = document.createElement('slot');
    $avatar.name = 'avatar';
    avatar.appendChild($avatar);

    const heading = document.createElement('div');
    heading.classList.add('ZAlert-heading');
    const $heading = document.createElement('slot');
    $heading.name = 'heading';
    heading.appendChild($heading);

    const message = document.createElement('div');
    message.classList.add('ZAlert-message');
    const $message = document.createElement('slot');
    $message.name = 'message';
    message.appendChild($message);

    const style = document.createElement('style');
    style.textContent = css;
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(style);
    shadow.appendChild(avatar);
    shadow.appendChild(heading);
    shadow.appendChild(message);
  }

  private _refreshFashion = () => {
    const { style } = this;
    const detail = new ZFashionDetail(this.fashion);

    style.setProperty('--alert-color', detail.color('contrast'));
    style.setProperty('--alert-background', detail.color('main'));
    style.setProperty('--alert-border-color', detail.color('border'));

    const thickness = ZFashionTailorElement.thicknessVar(ZSizeFixed.ExtraSmall);
    const shadow = detail.color('border');
    style.setProperty('--alert-box-shadow', `0 0 0 ${thickness} ${shadow}`);
  };

  public connectedCallback(): void {
    this.classList.add('ZAlert-root');
    this._refreshFashion();
  }

  public attributeChangedCallback(): void {
    this._refreshFashion();
  }
}
