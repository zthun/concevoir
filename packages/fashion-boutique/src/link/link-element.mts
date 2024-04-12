import { ZFashionPriority } from '@zthun/fashion-theme';
import { css } from '@zthun/helpful-fn';
import {
  IZComponentStyles,
  IZComponentWithStyleElement,
  ZAttribute,
  ZComponentClass,
  ZComponentGenerateId,
  ZComponentRegister,
  ZComponentStyles,
  ZComponentStylesAddOnConnect,
  ZComponentStylesUpdateOnAttributeChange
} from '@zthun/spellcraft';
import { ZFashionDetail } from '../component/component-fashion.mjs';

export interface ZLinkElement extends IZComponentWithStyleElement {}

@ZComponentRegister('z-link', { extend: 'a' })
@ZComponentClass('ZLink-root')
@ZComponentStylesUpdateOnAttributeChange()
@ZComponentStylesAddOnConnect()
@ZComponentGenerateId()
@ZComponentStyles({ prefix: 'z-link' })
export class ZLinkElement extends HTMLAnchorElement implements IZComponentStyles {
  public static readonly observedAttributes = ['data-fashion'];

  @ZAttribute({ name: 'data-fashion', fallback: ZFashionPriority.Primary })
  public fashion: string;

  public styles(): string {
    const { fashion, id } = this;
    const detail = new ZFashionDetail(fashion);

    return css`
      #${id} {
        color: ${detail.color('main')};
      }

      #${id}:hover {
        color: ${detail.color('hover.main')};
      }

      #${id}:focus {
        color: ${detail.color('focus.main')};
      }

      #${id}:active {
        color: ${detail.color('active.main')};
      }

      #${id}:visited {
        color: ${detail.color('dark')};
      }
    `;
  }
}
