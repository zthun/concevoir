import {
  IZComponentRender,
  IZComponentTemplate,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow,
} from "@zthun/spellcraft";
import { ZComponentTemplateTypography } from "./component-template-typography.mjs";

export interface ZParagraphBodyElement
  extends IZComponentRender,
    IZComponentTemplate {}

@ZComponentRegister("z-paragraph-body", { extend: "p" })
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderTemplate()
@ZComponentTemplateTypography({
  scale: {
    xl: 1,
    lg: 0.98,
    md: 0.95,
    sm: 0.92,
    xs: 0.9,
  },
})
@ZComponentClass(
  "ZTypography-root",
  "ZTypography-paragraph",
  "ZTypography-paragraph-body",
)
@ZComponentShadow()
export class ZParagraphBodyElement extends HTMLParagraphElement {}
