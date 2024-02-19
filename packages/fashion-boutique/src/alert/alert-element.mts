import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { IZComponentAttributeChanged, IZComponentConnected } from 'src/element/component-lifecycle.mjs';
import { WithFashion } from '../element/with-fashion.mjs';
import { WithTailor } from '../element/with-tailor.mjs';

export class ZAlertElement
  extends WithTailor(WithFashion(HTMLElement))
  implements IZComponentConnected, IZComponentAttributeChanged
{
  public static readonly register = registerCustomElement.bind(null, 'z-alert', ZAlertElement);

  private _root: HTMLDivElement;
  private _avatar: HTMLDivElement;
  private _heading: HTMLDivElement;
  private _message: HTMLDivElement;

  public constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._root = document.createElement('div');
    this._root.style.alignItems = 'center';
    this._root.style.borderStyle = 'double';
    this._root.style.display = 'grid';
    this._root.style.gridTemplateColumns = 'auto auto 1fr';
    this._root.style.borderRadius = this.thickness(ZSizeFixed.ExtraLarge);
    this._root.style.borderWidth = this.thickness(ZSizeFixed.Medium);
    this._root.style.paddingBottom = this.gap(ZSizeFixed.ExtraSmall);
    this._root.style.paddingTop = this.gap(ZSizeFixed.ExtraSmall);
    this._root.style.paddingLeft = this.gap(ZSizeFixed.Small);
    this._root.style.paddingRight = this.gap(ZSizeFixed.Small);

    this._root.style.gridTemplateAreas = `
      "avatar heading ."
      "avatar message ."
    `;

    this._avatar = document.createElement('div');
    this._avatar.style.gridArea = 'avatar';
    this._avatar.style.marginRight = this.gap(ZSizeFixed.ExtraSmall);
    const avatar = document.createElement('slot');
    avatar.name = 'avatar';
    this._avatar.appendChild(avatar);

    this._heading = document.createElement('div');
    this._heading.style.gridArea = 'heading';
    this._heading.style.marginBottom = `calc(${this.gap(ZSizeFixed.ExtraSmall)} / 2)`;
    const heading = document.createElement('slot');
    heading.name = 'heading';
    this._heading.appendChild(heading);

    this._message = document.createElement('div');
    this._message.style.gridArea = 'message';
    const message = document.createElement('slot');
    message.name = 'message';
    this._message.appendChild(message);

    this._root.appendChild(this._avatar);
    this._root.appendChild(this._heading);
    this._root.appendChild(this._message);

    this.shadowRoot?.appendChild(this._root);
  }

  public connectedCallback(): void {
    this.classList.add('ZAlert-root');
    this.attributeChangedCallback();
  }

  public attributeChangedCallback(): void {
    const fallback = ZFashionPriority.Primary;

    this._root.style.color = this.color('contrast', fallback);
    this._root.style.backgroundColor = this.color('main', fallback);
    this._root.style.borderColor = this.color(['border', 'main'], fallback);

    const thickness = this.thickness(ZSizeFixed.ExtraSmall);
    const shadow = this.color(['border', 'main'], fallback);
    this._root.style.boxShadow = `0 0 0 ${thickness} ${shadow}`;
  }
}
