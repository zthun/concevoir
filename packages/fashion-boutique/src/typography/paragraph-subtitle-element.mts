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

export interface ZParagraphSubtitleElement extends IZComponentRender, IZComponentTemplate {}

@ZComponentRegister('z-paragraph-subtitle', { extend: 'p' })
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderTemplate()
@ZComponentTemplateTypography({
  scale: {
    xl: 1,
    lg: 0.98,
    md: 0.95,
    sm: 0.92,
    xs: 0.9
  },
  transform: 'uppercase'
})
@ZComponentClass('ZTypography-root', 'ZTypography-paragraph', 'ZTypography-paragraph-subtitle')
@ZComponentShadow()
export class ZParagraphSubtitleElement extends HTMLParagraphElement {}
