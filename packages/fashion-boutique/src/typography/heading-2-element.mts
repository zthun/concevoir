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

export interface ZHeadingTwoElement
  extends IZComponentRender,
    IZComponentTemplate {}

@ZComponentRegister("z-h2", { extend: "h2" })
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderTemplate()
@ZComponentTemplateTypography({
  scale: {
    xl: 2.2,
    lg: 2.1,
    md: 2,
    sm: 1.9,
    xs: 1.8,
  },
  weight: "bold",
})
@ZComponentClass(
  "ZTypography-root",
  "ZTypography-heading",
  "ZTypography-heading-2",
)
@ZComponentShadow()
export class ZHeadingTwoElement extends HTMLHeadingElement {}
