import {
  IZComponentRender,
  IZComponentTemplate,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZComponentClass } from './component-class.mjs';
import { ZComponentTemplateTypography } from './component-template-typography.mjs';

export interface ZParagraphCaptionElement extends IZComponentRender, IZComponentTemplate {}

@ZComponentRegister('z-paragraph-caption', { extend: 'p' })
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderTemplate()
@ZComponentTemplateTypography({
  scale: {
    xl: 0.9,
    lg: 0.87,
    md: 0.85,
    sm: 0.82,
    xs: 0.8
  }
})
@ZComponentClass('ZTypography-root', 'ZTypography-paragraph', 'ZTypography-paragraph-caption')
@ZComponentShadow()
export class ZParagraphCaptionElement extends HTMLParagraphElement {}
