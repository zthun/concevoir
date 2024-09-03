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

export interface ZHeadingFiveElement
  extends IZComponentRender,
    IZComponentTemplate {}

@ZComponentRegister("z-h5", { extend: "h5" })
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderTemplate()
@ZComponentTemplateTypography({
  scale: {
    xl: 1.6,
    lg: 1.5,
    md: 1.4,
    sm: 1.3,
    xs: 1.2,
  },
  weight: "bold",
})
@ZComponentClass(
  "ZTypography-root",
  "ZTypography-heading",
  "ZTypography-heading-5",
)
@ZComponentShadow()
export class ZHeadingFiveElement extends HTMLHeadingElement {}
