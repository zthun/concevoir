import { registerCustomElement } from '@zthun/helpful-dom';
import { ZFashionTailorElement } from 'src/theme/fashion-tailor-element.mjs';
import { css } from '../theme/css.mjs';
import { ZBoxRectangleElement } from './box-rectangle-element.mjs';

export class ZBoxMarginElement extends ZBoxRectangleElement {
  public static readonly register = registerCustomElement.bind(null, 'z-box-margin', ZBoxMarginElement);
  public static readonly observeAttributes = Object.freeze(['left', 'right', 'top', 'bottom']);

  public connectedCallback() {
    this._applyVariables();
    this.classList.add('ZBox-margin');
    this.classList.add(
      css({
        display: 'block',
        marginBottom: 'var(--box-margin-bottom)',
        marginLeft: 'var(--box-margin-left)',
        marginRight: 'var(--box-margin-right)',
        marginTop: 'var(--box-margin-top)'
      })
    );
  }

  private _applyVariables() {
    const mb = ZFashionTailorElement.gapProperty(this.bottom());
    const ml = ZFashionTailorElement.gapProperty(this.left());
    const mr = ZFashionTailorElement.gapProperty(this.right());
    const mt = ZFashionTailorElement.gapProperty(this.top());

    this.style.setProperty('--box-margin-bottom', `var(${mb})`);
    this.style.setProperty('--box-margin-left', `var(${ml})`);
    this.style.setProperty('--box-margin-right', `var(${mr})`);
    this.style.setProperty('--box-margin-top', `var(${mt})`);
  }
}
