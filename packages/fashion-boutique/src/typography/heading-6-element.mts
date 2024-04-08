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

export interface ZHeadingSixElement extends IZComponentRender, IZComponentTemplate {}

@ZComponentRegister('z-h6', { extend: 'h6' })
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderTemplate()
@ZComponentTemplateTypography({
  scale: {
    xl: 1.4,
    lg: 1.3,
    md: 1.2,
    sm: 1.1,
    xs: 1
  },
  weight: 'bold',
  transform: 'uppercase'
})
@ZComponentClass('ZTypography-root', 'ZTypography-heading', 'ZTypography-heading-6')
@ZComponentShadow()
export class ZHeadingSixElement extends HTMLHeadingElement {}
