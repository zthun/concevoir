import { registerCustomElement } from '@zthun/helpful-dom';
import { css } from '../theme/css.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZBoxRectangleElement } from './box-rectangle-element.mjs';

export class ZBoxPaddingElement extends ZBoxRectangleElement {
  public static readonly register = registerCustomElement.bind(null, 'z-box-padding', ZBoxPaddingElement);
  public static readonly observeAttributes = Object.freeze(['left', 'right', 'top', 'bottom']);

  public connectedCallback() {
    this._applyVariables();
    this.classList.add('ZBox-padding');
    this.classList.add(
      css({
        display: 'block',
        paddingBottom: 'var(--box-padding-bottom)',
        paddingLeft: 'var(--box-padding-left)',
        paddingRight: 'var(--box-padding-right)',
        paddingTop: 'var(--box-padding-top)'
      })
    );
  }

  private _applyVariables() {
    const pb = ZFashionTailorElement.gapProperty(this.bottom());
    const pl = ZFashionTailorElement.gapProperty(this.left());
    const pr = ZFashionTailorElement.gapProperty(this.right());
    const pt = ZFashionTailorElement.gapProperty(this.top());

    this.style.setProperty('--box-padding-bottom', `var(${pb})`);
    this.style.setProperty('--box-padding-left', `var(${pl})`);
    this.style.setProperty('--box-padding-right', `var(${pr})`);
    this.style.setProperty('--box-padding-top', `var(${pt})`);
  }
}
