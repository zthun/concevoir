import {
  IZComponentRender,
  IZComponentStyles,
  IZComponentWithStyleElement,
  ZComponentClass,
  ZComponentGenerateId,
  ZComponentLink,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentStyles,
  ZComponentStylesAddOnConnect,
  ZComponentStylesRemoveOnDisconnect,
  ZComponentStylesUpdateOnAttributeChange,
} from "@zthun/spellcraft";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { ZComponentIcon } from "./component-icon.mjs";

export interface ZIconMaterialElement
  extends IZComponentStyles,
    IZComponentWithStyleElement,
    Required<IZComponentName>,
    Required<IZComponentFashion> {}

@ZComponentRegister("z-icon-material")
@ZComponentLink("stylesheet", ZIconMaterialElement.Provider)
@ZComponentClass("ZIcon-root", "ZIcon-material")
@ZComponentRenderOnConnected()
@ZComponentRenderOnAttributeChanged()
@ZComponentStylesRemoveOnDisconnect()
@ZComponentStylesUpdateOnAttributeChange()
@ZComponentStylesAddOnConnect()
@ZComponentStyles({ prefix: "z-icon-material" })
@ZComponentIcon("question-mark")
@ZComponentGenerateId({ prefix: "ZIcon-material" })
export class ZIconMaterialElement
  extends HTMLElement
  implements IZComponentStyles, IZComponentRender
{
  public static readonly observedAttributes = ["fashion", "name"];
  public static readonly Provider =
    "https://fonts.googleapis.com/icon?family=Material+Icons";
  public static readonly Vendor = "material";

  public render(node: Node): void {
    const { name } = this;
    this.setAttribute("data-vendor", ZIconMaterialElement.Vendor);

    let target = this.querySelector<HTMLSpanElement>(".ZIcon-font");

    if (target == null) {
      target = document.createElement("span");
      target.classList.add("ZIcon-font");
      target.classList.add("material-icons");
      node.appendChild(target);
    }

    target.textContent = name;
  }
}
