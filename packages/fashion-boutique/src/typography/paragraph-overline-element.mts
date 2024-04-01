import {
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZTypography } from './typography.mjs';

@ZComponentRegister('z-paragraph-overline', { extend: 'p' })
@ZTypography({ scale: { xl: 0.95 } })
@ZComponentRenderTemplate()
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentShadow()
export class ZParagraphOverlineElement extends HTMLParagraphElement {}
