import {
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZTypography } from './typography.mjs';

@ZComponentRegister('z-h3', { extend: 'h3' })
@ZTypography({ scale: { xl: 1.8, lg: 1.7, md: 1.6, sm: 1.5, xs: 1.4 }, weight: 'bold' })
@ZComponentRenderTemplate()
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentShadow()
export class ZHeadingThreeElement extends HTMLHeadingElement {}
