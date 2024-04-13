import {
  IZComponentRender,
  IZComponentStyles,
  IZComponentWithStyleElement,
  IZLifecycleAttributeChanged,
  IZLifecycleConnected,
  ZAttribute,
  ZComponentClass,
  ZComponentGenerateId,
  ZComponentLink,
  ZComponentRegister,
  ZComponentStyles,
  ZComponentStylesAddOnConnect,
  ZComponentStylesRemoveOnDisconnect,
  ZComponentStylesUpdateOnAttributeChange
} from '@zthun/spellcraft';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { ZComponentIcon } from './component-icon.mjs';

export interface ZIconFontAwesomeElement
  extends IZComponentRender,
    IZComponentStyles,
    IZComponentWithStyleElement,
    Required<IZComponentName>,
    Required<IZComponentFashion> {}

@ZComponentRegister('z-icon-font-awesome')
@ZComponentLink('stylesheet', ZIconFontAwesomeElement.Provider)
@ZComponentClass('ZIcon-root', 'ZIcon-font-awesome', 'ZIcon-font')
@ZComponentStylesRemoveOnDisconnect()
@ZComponentStylesUpdateOnAttributeChange()
@ZComponentStylesAddOnConnect()
@ZComponentStyles({ prefix: 'z-icon-font-awesome' })
@ZComponentIcon('question')
@ZComponentGenerateId({ prefix: 'z-icon-font-awesome' })
export class ZIconFontAwesomeElement
  extends HTMLElement
  implements IZComponentStyles, IZLifecycleConnected, IZLifecycleAttributeChanged
{
  public static readonly observedAttributes = ['fashion', 'name', 'family', 'kind'];
  public static readonly Provider = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
  public static readonly Vendor = 'font-awesome';

  @ZAttribute({ fallback: 'classic' })
  public family: 'classic' | 'sharp' | 'brands';

  @ZAttribute({ fallback: 'solid' })
  public kind: 'solid' | 'regular' | 'duotone' | 'light' | 'thin';

  public connectedCallback(): void {
    const { family, kind, name } = this;
    this.classList.add(`fa-${family}`);
    this.classList.add(`fa-${kind}`);
    this.classList.add(`fa-${name}`);
    this.setAttribute('data-vendor', ZIconFontAwesomeElement.Vendor);
  }

  public attributeChangedCallback(_: string, oldValue: string, newValue: string): void {
    this.classList.remove(`fa-${oldValue}`);
    this.classList.add(`fa-${newValue}`);
  }
}
