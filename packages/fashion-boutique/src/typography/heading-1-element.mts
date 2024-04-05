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

export interface ZHeadingOneElement extends IZComponentRender, IZComponentTemplate {}

@ZComponentRegister('z-h1', { extend: 'h1' })
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderTemplate()
@ZComponentTemplateTypography({
  scale: {
    xl: 3,
    lg: 2.8,
    md: 2.6,
    sm: 2.4,
    xs: 2.2
  },
  weight: 'bold'
})
@ZComponentClass('ZTypography-root', 'ZTypography-heading', 'ZTypography-heading-1')
@ZComponentShadow()
export class ZHeadingOneElement extends HTMLHeadingElement {}
