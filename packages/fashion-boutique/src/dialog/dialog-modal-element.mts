import {
  IZDeviceValueMap,
  ZFashionDevice,
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
} from "@zthun/fashion-tailor";
import { ZFashionArea } from "@zthun/fashion-theme";
import { css } from "@zthun/helpful-fn";
import {
  IZComponentRender,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderOnEvent,
  ZComponentShadow,
} from "@zthun/spellcraft";
import {
  ZDeviceElement,
  ZPropertyDeviceHeight,
  ZPropertyDeviceWidth,
} from "../background/device-element.mjs";
import { ZFashionDetail } from "../component/component-fashion.mjs";
import { ZFashionTailorElement } from "../theme/fashion-tailor-element.mjs";
import { ZDialogElement } from "./dialog-element.mjs";

@ZComponentRegister("z-dialog-modal")
@ZComponentClass("ZDialog-root", "ZDialog-modal")
@ZComponentRenderOnEvent("change", { selector: ZDeviceElement.width() })
@ZComponentRenderOnEvent("change", { selector: ZDeviceElement.height() })
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentShadow()
export class ZDialogModalElement
  extends ZDialogElement
  implements IZComponentRender
{
  public static readonly SizeChartWidth = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(10, 20), "rem"),
    [ZSizeVaried.Full]: "auto",
    [ZSizeVaried.Fit]: undefined,
  });

  public static readonly SizeChartHeight = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(3, 20), "rem"),
    [ZSizeVaried.Full]: "auto",
    [ZSizeVaried.Fit]: undefined,
  });

  @ZPropertyDeviceWidth(ZSizeVaried.Fit)
  public width: Required<IZDeviceValueMap<ZSizeFixed | ZSizeVaried>>;

  @ZPropertyDeviceHeight(ZSizeVaried.Fit)
  public height: Required<IZDeviceValueMap<ZSizeFixed | ZSizeVaried>>;

  public styles() {
    const device = new ZFashionDevice();
    const { fashion, height, width } = this;
    const detail = new ZFashionDetail(fashion);
    const surface = new ZFashionDetail(ZFashionArea.Surface);
    const px = ZFashionTailorElement.gapVar(ZSizeFixed.Medium);
    const py = ZFashionTailorElement.gapVar(ZSizeFixed.Small);

    // https://github.com/capricorn86/happy-dom/issues/564
    /* istanbul ignore next --@preserve */
    const marginFor = (x: ZSizeFixed | ZSizeVaried) =>
      x === ZSizeVaried.Full ? 0 : "auto";

    return css`
      @keyframes fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      dialog {
        background-color: ${surface.color("main")};
        border: 0;
        color: ${surface.color("contrast")};
        height: ${ZDialogModalElement.SizeChartHeight[height.xl]};
        margin-bottom: ${marginFor(height.xl)};
        margin-left: ${marginFor(width.xl)};
        margin-right: ${marginFor(width.xl)};
        margin-top: ${marginFor(height.xl)};
        max-height: 100%;
        max-width: 100%;
        padding: 0;
        transition: opacity 200ms ease-out;
        box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.75);
        width: ${ZDialogModalElement.SizeChartWidth[width.xl]};
      }

      dialog[open] {
        animation: fade 200ms ease-in;
        display: flex;
        flex-direction: column;
      }

      dialog.closing {
        opacity: 0;
      }

      .ZDialog-header,
      .ZDialog-content,
      .ZDialog-footer {
        flex-shrink: 0;
        flex-basis: 0;
        padding: ${py} ${px};
      }

      .ZDialog-header {
        background-color: ${detail.color("main")};
        color: ${detail.color("contrast")};
      }

      .ZDialog-content {
        flex-grow: 1;
        overflow: auto;
      }

      ${device.break(ZSizeFixed.Large)} {
        dialog {
          height: ${ZDialogModalElement.SizeChartHeight[height.lg]};
          margin-bottom: ${marginFor(height.lg)};
          margin-left: ${marginFor(width.lg)};
          margin-right: ${marginFor(width.lg)};
          margin-top: ${marginFor(height.lg)};
          width: ${ZDialogModalElement.SizeChartWidth[width.lg]};
        }
      }

      ${device.break(ZSizeFixed.Medium)} {
        dialog {
          height: ${ZDialogModalElement.SizeChartHeight[height.md]};
          margin-bottom: ${marginFor(height.md)};
          margin-left: ${marginFor(width.md)};
          margin-right: ${marginFor(width.md)};
          margin-top: ${marginFor(height.md)};
          width: ${ZDialogModalElement.SizeChartWidth[width.md]};
        }
      }

      ${device.break(ZSizeFixed.Small)} {
        dialog {
          height: ${ZDialogModalElement.SizeChartHeight[height.sm]};
          margin-bottom: ${marginFor(height.sm)};
          margin-left: ${marginFor(width.sm)};
          margin-right: ${marginFor(width.sm)};
          margin-top: ${marginFor(height.sm)};
          width: ${ZDialogModalElement.SizeChartWidth[width.sm]};
        }
      }

      ${device.break(ZSizeFixed.ExtraSmall)} {
        dialog {
          height: ${ZDialogModalElement.SizeChartHeight[height.xs]};
          margin-bottom: ${marginFor(height.xs)};
          margin-left: ${marginFor(width.xs)};
          margin-right: ${marginFor(width.xs)};
          margin-top: ${marginFor(height.xs)};
          width: ${ZDialogModalElement.SizeChartWidth[width.xs]};
        }
      }
    `;
  }
}
