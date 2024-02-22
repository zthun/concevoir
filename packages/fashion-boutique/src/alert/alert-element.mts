import { ZSizeFixed } from '@zthun/fashion-tailor';
import { IZFashion, ZFashionPriority } from '@zthun/fashion-theme';
import {
  IZComponentConnected,
  IZComponentPropertyChanged,
  ZProperty,
  cssVariable,
  registerCustomElement
} from '@zthun/helpful-dom';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export class ZAlertElement
  extends HTMLElement
  implements IZComponentConnected, IZComponentPropertyChanged, IZComponentFashion
{
  public static readonly register = registerCustomElement.bind(null, 'z-alert', ZAlertElement);

  @ZProperty<IZFashion | string>({ attribute: ZFashionDetail.nameOf })
  public fashion?: IZFashion | string;

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

  public connectedCallback(): void {
    this.classList.add('ZAlert-root');
    this.propertyChangedCallback();
  }

  public propertyChangedCallback(): void {
    const { style } = this;
    const fallback = ZFashionPriority.Primary;
    const detail = new ZFashionDetail(this.fashion);

    style.setProperty('--alert-color', detail.color('contrast', fallback));
    style.setProperty('--alert-background', detail.color('main', fallback));
    style.setProperty('--alert-border-color', detail.color(['border', 'main'], fallback));

    const thickness = ZFashionTailorElement.thicknessVar(ZSizeFixed.ExtraSmall);
    const shadow = detail.color(['border', 'main'], fallback);
    style.setProperty('--alert-box-shadow', `0 0 0 ${thickness} ${shadow}`);
  }
}
