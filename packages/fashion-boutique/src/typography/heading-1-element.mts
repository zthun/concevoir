import {
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZTypography } from './typography.mjs';

@ZComponentRegister('z-h1', { extend: 'h1' })
@ZTypography({ scale: { xl: 3, lg: 2.8, md: 2.6, sm: 2.4, xs: 2.2 }, weight: 'bold' })
@ZComponentRenderTemplate()
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentShadow()
export class ZHeadingOneElement extends HTMLHeadingElement {}
