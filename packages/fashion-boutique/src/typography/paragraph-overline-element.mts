import {
  IZComponentRender,
  IZComponentTemplate,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZComponentTemplateTypography } from './component-template-typography.mjs';

export interface ZParagraphOverlineElement extends IZComponentRender, IZComponentTemplate {}

@ZComponentRegister('z-paragraph-overline', { extend: 'p' })
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderTemplate()
@ZComponentTemplateTypography({
  scale: {
    xl: 0.95
  }
})
@ZComponentClass('ZTypography-root', 'ZTypography-paragraph', 'ZTypography-paragraph-overline')
@ZComponentShadow()
export class ZParagraphOverlineElement extends HTMLParagraphElement {}
