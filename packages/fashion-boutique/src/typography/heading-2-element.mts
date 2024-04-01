import {
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZTypography } from './typography.mjs';

@ZComponentRegister('z-h2', { extend: 'h2' })
@ZTypography({ scale: { xl: 2.2, lg: 2.1, md: 2, sm: 1.9, xs: 1.8 }, weight: 'bold' })
@ZComponentRenderTemplate()
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentShadow()
export class ZHeadingTwoElement extends HTMLHeadingElement {}
