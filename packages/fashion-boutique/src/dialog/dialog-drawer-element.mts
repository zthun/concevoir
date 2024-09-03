import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZFashionArea, black } from "@zthun/fashion-theme";
import {
  ZHorizontalAnchor,
  ZSideAnchor,
  ZVerticalAnchor,
  css,
} from "@zthun/helpful-fn";
import {
  IZComponentRender,
  ZAttribute,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentShadow,
} from "@zthun/spellcraft";
import { ZFashionDetail } from "../component/component-fashion.mjs";
import { ZFashionTailorElement } from "../theme/fashion-tailor-element.mjs";
import { ZDialogElement } from "./dialog-element.mjs";

@ZComponentRegister("z-dialog-drawer")
@ZComponentClass("ZDialog-root", "ZDialog-drawer")
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentShadow()
export class ZDialogDrawerElement
  extends ZDialogElement
  implements IZComponentRender
{
  public static readonly observedAttributes = Object.freeze([
    ...ZDialogElement.observedAttributes,
    "anchor",
  ]);

  @ZAttribute({ fallback: ZHorizontalAnchor.Left })
  public anchor: ZSideAnchor;

  public styles() {
    const { anchor, fashion } = this;
    const detail = new ZFashionDetail(fashion);
    const surface = new ZFashionDetail(ZFashionArea.Surface);

    let width: "max-content" | "100%" = "max-content";
    let height: "max-content" | "100%" = "100%";
    let transformHide = "translateX(-100%)";
    let transformShow = "translateX(0)";
    let marginLeft: "auto" | "0" = "0";
    let marginTop: "auto" | "0" = "0";
    let marginBottom: "auto" | "0" = "0";

    if (anchor === ZHorizontalAnchor.Right) {
      transformHide = "translateX(100%)";
      marginLeft = "auto";
    }

    if (anchor === ZVerticalAnchor.Bottom) {
      height = "max-content";
      marginTop = "auto";
      transformHide = "translateY(100%)";
      transformShow = "translateY(0)";
      width = "100%";
    }

    if (anchor === ZVerticalAnchor.Top) {
      height = "max-content";
      marginBottom = "auto";
      transformHide = "translateY(-100%)";
      transformShow = "translateY(0)";
      width = "100%";
    }

    return css`
      @keyframes slide-in {
        from {
          transform: ${transformHide};
        }
        to {
          transform: ${transformShow};
        }
      }

      dialog {
        background-color: ${surface.color("main")};
        border: 0;
        color: ${surface.color("contrast")};
        height: ${height};
        margin-bottom: ${marginBottom};
        margin-left: ${marginLeft};
        margin-right: 0;
        margin-top: ${marginTop};
        max-height: 100%;
        max-width: 100%;
        padding: 0;
        transform: ${transformHide};
        transition: transform 200ms linear;
        width: ${width};
      }

      dialog::backdrop {
        background-color: ${black()};
        opacity: 0.75;
      }

      dialog[open] {
        animation: slide-in 200ms linear;
        transform: ${transformShow};
        display: flex;
        flex-direction: column;
      }

      dialog.closing {
        transform: ${transformHide};
      }

      .ZDialog-header,
      .ZDialog-footer,
      .ZDialog-content {
        flex-basis: 0;
        padding: ${ZFashionTailorElement.gapVar(ZSizeFixed.Small)};
      }

      .ZDialog-header {
        background-color: ${detail.color("main")};
        color: ${detail.color("contrast")};
      }

      .ZDialog-content {
        flex-grow: 1;
        overflow: auto;
      }
    `;
  }
}
