import {
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZTypography } from './typography.mjs';

@ZComponentRegister('z-h5', { extend: 'h5' })
@ZTypography({ scale: { xl: 1.6, lg: 1.5, md: 1.4, sm: 1.3, xs: 1.2 }, weight: 'bold' })
@ZComponentRenderTemplate()
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentShadow()
export class ZHeadingFiveElement extends HTMLHeadingElement {}
