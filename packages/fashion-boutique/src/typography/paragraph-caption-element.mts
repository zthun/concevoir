import {
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZTypography } from './typography.mjs';

@ZComponentRegister('z-paragraph-caption', { extend: 'p' })
@ZTypography({ scale: { xl: 0.9, lg: 0.87, md: 0.85, sm: 0.82, xs: 0.8 } })
@ZComponentRenderTemplate()
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentShadow()
export class ZParagraphCaptionElement extends HTMLParagraphElement {}
