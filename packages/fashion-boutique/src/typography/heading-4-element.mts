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

export interface ZHeadingFourElement extends IZComponentRender, IZComponentTemplate {}

@ZComponentRegister('z-h4', { extend: 'h4' })
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderTemplate()
@ZComponentTemplateTypography({
  scale: {
    xl: 1.7,
    lg: 1.6,
    md: 1.5,
    sm: 1.4,
    xs: 1.3
  },
  weight: 'bold',
  transform: 'uppercase'
})
@ZComponentClass('ZTypography-root', 'ZTypography-heading', 'ZTypography-heading-4')
@ZComponentShadow()
export class ZHeadingFourElement extends HTMLHeadingElement {}
