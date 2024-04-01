import {
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZTypography } from './typography.mjs';

@ZComponentRegister('z-paragraph-subtitle', { extend: 'p' })
@ZTypography({ scale: { xl: 1, lg: 0.98, md: 0.95, sm: 0.92, xs: 0.9 }, transform: 'uppercase' })
@ZComponentRenderTemplate()
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentShadow()
export class ZParagraphSubtitleElement extends HTMLParagraphElement {}
