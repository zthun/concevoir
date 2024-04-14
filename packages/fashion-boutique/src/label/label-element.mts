import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionSeverity } from '@zthun/fashion-theme';
import { css } from '@zthun/helpful-fn';
import {
  IZComponentStyles,
  IZComponentWithStyleElement,
  ZComponentClass,
  ZComponentRegister,
  ZComponentStyles,
  ZComponentStylesAddOnConnect,
  ZComponentStylesRemoveOnDisconnect,
  ZComponentStylesUpdateOnAttributeChange
} from '@zthun/spellcraft';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';

export interface ZLabelElement extends IZComponentWithStyleElement {}

@ZComponentRegister('z-label', { extend: 'label' })
@ZComponentStylesRemoveOnDisconnect()
@ZComponentStylesUpdateOnAttributeChange()
@ZComponentStylesAddOnConnect()
@ZComponentStyles({ prefix: 'z-label' })
@ZComponentClass('ZLabel-root')
export class ZLabelElement extends HTMLLabelElement implements IZComponentStyles {
  public static readonly observedAttributes = ['data-required'];

  public styles() {
    return css`
      .ZLabel-root {
        display: block;
        font-weight: bold;
      }

      .ZLabel-root[data-required='true']::after {
        content: '*';
        color: ${ZFashionThemeElement.variable(ZFashionSeverity.Error, 'main')};
        margin-left: ${ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)};
      }
    `;
  }
}
