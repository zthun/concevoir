import {
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZTypography } from './typography.mjs';

@ZComponentRegister('z-paragraph-body', { extend: 'p' })
@ZTypography({ scale: { xl: 1, lg: 0.98, md: 0.95, sm: 0.92, xs: 0.9 } })
@ZComponentRenderTemplate()
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentShadow()
export class ZParagraphBodyElement extends HTMLParagraphElement {}
