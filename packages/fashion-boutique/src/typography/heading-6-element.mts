import {
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZTypography } from './typography.mjs';

@ZComponentRegister('z-h6', { extend: 'h6' })
@ZTypography({ scale: { xl: 1.4, lg: 1.3, md: 1.2, sm: 1.1, xs: 1 }, weight: 'bold', transform: 'uppercase' })
@ZComponentRenderTemplate()
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentShadow()
export class ZHeadingSixElement extends HTMLHeadingElement {}
