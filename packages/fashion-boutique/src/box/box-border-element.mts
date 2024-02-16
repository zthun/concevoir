import { registerCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { css } from '../theme/css.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZBoxRectangleElement } from './box-rectangle-element.mjs';

export class ZBoxBorderElement extends ZBoxRectangleElement {
  public static readonly register = registerCustomElement.bind(null, 'z-box-border', ZBoxBorderElement);
  public static readonly observeAttributes = Object.freeze(['left', 'right', 'top', 'bottom', 'kind']);

  public kind(): Property.BorderStyle {
    return firstDefined('none', this.getAttribute('kind'));
  }

  public connectedCallback() {
    this._applyVariables();
    this.classList.add('ZBox-border');
    this.classList.add(
      css({
        display: 'block',
        borderStyle: 'var(--box-border-style)',
        borderBottomWidth: 'var(--box-border-width-bottom)',
        borderLeftWidth: 'var(--box-border-width-left)',
        borderRightWidth: 'var(--box-border-width-left)',
        borderTopWidth: 'var(--box-border-width-top)'
      })
    );
  }

  private _applyVariables() {
    this.style.setProperty('--box-border-style', this.kind());

    const b = ZFashionTailorElement.thicknessProperty(this.bottom());
    const l = ZFashionTailorElement.thicknessProperty(this.left());
    const r = ZFashionTailorElement.thicknessProperty(this.right());
    const t = ZFashionTailorElement.thicknessProperty(this.top());
    this.style.setProperty('--box-border-width-bottom', `var(${b})`);
    this.style.setProperty('--box-border-width-left', `var(${l})`);
    this.style.setProperty('--box-border-width-right', `var(${r})`);
    this.style.setProperty('--box-border-width-top', `var(${t})`);
  }
}
