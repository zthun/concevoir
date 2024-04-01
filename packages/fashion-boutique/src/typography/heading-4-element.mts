import {
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZTypography } from './typography.mjs';

@ZComponentRegister('z-h4', { extend: 'h4' })
@ZTypography({ scale: { xl: 1.7, lg: 1.6, md: 1.5, sm: 1.4, xs: 1.3 }, weight: 'bold', transform: 'uppercase' })
@ZComponentRenderTemplate()
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentShadow()
export class ZHeadingFourElement extends HTMLHeadingElement {}
