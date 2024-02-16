import { ZFashionIntrinsic, ZFashionName } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { css } from '../theme/css.mjs';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';

export class ZBoxElement extends HTMLElement {
  public static readonly register = registerCustomElement.bind(null, 'z-box', ZBoxElement);
  public static readonly observeAttributes = Object.freeze(['fashion', 'cursor', 'justification']);

  public fashion(): ZFashionName {
    return firstDefined(ZFashionIntrinsic.Inherit, this.getAttribute('fashion') as ZFashionName);
  }

  public justification(): Property.TextAlign {
    return firstDefined('left', this.getAttribute('justification') as Property.TextAlign);
  }

  public connectedCallback() {
    this._applyVariables();
    this.classList.add('ZBox-root');
    this.classList.add(
      css({
        'display': 'block',
        'backgroundColor': 'var(--box-background)',
        'color': 'var(--box-color)',
        'cursor': 'var(--box-cursor)',
        'textAlign': 'var(--box-justification)',

        'borderColor': 'var(--box-border-color)',

        '&:focus': {
          backgroundColor: 'var(--box-focus-background)',
          borderColor: 'var(--box-focus-border-color)',
          color: 'var(--box-focus-color)'
        },

        '&:hover': {
          backgroundColor: 'var(--box-hover-background)',
          borderColor: 'var(--box-hover-border-color)',
          color: 'var(--box-hover-color)'
        }
      } as any)
    );
  }

  private _applyVariables() {
    const fashion = this.fashion();

    this.style.setProperty('--box-cursor', 'default');
    this.style.setProperty('--box-justification', this.justification());

    const main = ZFashionThemeElement.property(fashion, 'main');
    this.style.setProperty('--box-background', `var(${main})`);
    this.style.setProperty('--box-focus-background', `var(${main})`);
    this.style.setProperty('--box-hover-background', `var(${main})`);

    const contrast = ZFashionThemeElement.property(fashion, 'contrast');
    this.style.setProperty('--box-color', `var(${contrast})`);
    this.style.setProperty('--box-focus-color', `var(${contrast})`);
    this.style.setProperty('--box-hover-color', `var(${contrast})`);

    const border = ZFashionThemeElement.property(fashion, 'border');
    this.style.setProperty('--box-border-color', `var(${border})`);
    this.style.setProperty('--box-focus-border-color', `var(${border})`);
    this.style.setProperty('--box-hover-border-color', `var(${border})`);

    if (this.tabIndex >= 0) {
      this.style.setProperty('--box-cursor', 'pointer');

      const focusMain = ZFashionThemeElement.property(fashion, 'focus.main');
      const focusContrast = ZFashionThemeElement.property(fashion, 'focus.contrast');
      const focusBorder = ZFashionThemeElement.property(fashion, 'focus.border');
      this.style.setProperty('--box-focus-background', `var(${focusMain})`);
      this.style.setProperty('--box-focus-border-color', `var(${focusBorder})`);
      this.style.setProperty('--box-focus-color', `var(${focusContrast})`);

      const hoverMain = ZFashionThemeElement.property(fashion, 'hover.main');
      const hoverContrast = ZFashionThemeElement.property(fashion, 'hover.contrast');
      const hoverBorder = ZFashionThemeElement.property(fashion, 'hover.border');
      this.style.setProperty('--box-hover-background', `var(${hoverMain})`);
      this.style.setProperty('--box-hover-border-color', `var(${hoverBorder})`);
      this.style.setProperty('--box-hover-color', `var(${hoverContrast})`);
    }
  }
}
