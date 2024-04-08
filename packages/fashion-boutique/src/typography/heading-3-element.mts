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

export interface ZHeadingThreeElement extends IZComponentRender, IZComponentTemplate {}

@ZComponentRegister('z-h3', { extend: 'h3' })
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderTemplate()
@ZComponentTemplateTypography({
  scale: {
    xl: 1.8,
    lg: 1.7,
    md: 1.6,
    sm: 1.5,
    xs: 1.4
  },
  weight: 'bold'
})
@ZComponentClass('ZTypography-root', 'ZTypography-heading', 'ZTypography-heading-3')
@ZComponentShadow()
export class ZHeadingThreeElement extends HTMLHeadingElement {}
