import { keyframes } from "@emotion/css";
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { css, cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { useRef } from "react";
import { IZComponentHeight } from "../component/component-height.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";
import { useCss } from "../theme/styled";
import { IZDialog, useDialog } from "./use-dialog";

export interface IZModal
  extends IZDialog,
    IZComponentWidth<ZSizeFixed | ZSizeVaried>,
    IZComponentHeight<ZSizeFixed | ZSizeVaried> {}

const WidthChart = Object.freeze({
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(10, 20), "rem"),
  [ZSizeVaried.Full]: "100%",
  [ZSizeVaried.Fit]: undefined,
});

const HeightChart = Object.freeze({
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(3, 20), "rem"),
  [ZSizeVaried.Full]: "100%",
  [ZSizeVaried.Fit]: undefined,
});

export function ZModal(props: IZModal) {
  const {
    children,
    className,
    name,
    fashion,
    renderHeader,
    renderFooter,
    width,
    height,
  } = props;
  const { surface } = useFashionTheme();
  const device = useFashionDevice();
  const tailor = useFashionTailor();
  const modal = useRef<HTMLDialogElement>(null);
  const _width = new ZDeviceValues(width, ZSizeVaried.Fit);
  const _height = new ZDeviceValues(height, ZSizeVaried.Fit);
  const picker = new ZColorPicker(firstDefined(surface, fashion));

  const marginFor = (x: ZSizeFixed | ZSizeVaried) =>
    x === ZSizeVaried.Full ? 0 : "auto";

  const { closeOnBackdropClick, closeOnEscapeKey } = useDialog(
    modal.current,
    props,
  );

  const fade = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

  const _className = useCss(css`
    & {
      background-color: ${surface.idle.main};
      border: 0;
      color: ${surface.idle.contrast};
      height: ${_height.xl === ZSizeVaried.Full ? "100%" : undefined};
      margin-bottom: ${marginFor(_height.xl)};
      margin-left: ${marginFor(_width.xl)};
      margin-right: ${marginFor(_width.xl)};
      margin-top: ${marginFor(_height.xl)};
      max-height: 100%;
      max-width: 100%;
      padding: 0;
      transition: opacity 200ms ease-out;
      box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.75);
      width: ${WidthChart[_width.xl]};
    }

    &[open] {
      animation: ${fade} 200ms ease-in;
      display: flex;
      flex-direction: column;
    }

    &.closing {
      opacity: 0;
    }

    .ZDialog-header,
    .ZDialog-content,
    .ZDialog-footer {
      padding: ${tailor.gap(ZSizeFixed.Small)} ${tailor.gap(ZSizeFixed.Medium)};
    }

    .ZDialog-header {
      background-color: ${picker.idle.main};
      color: ${picker.idle.contrast};
    }

    .ZDialog-content {
      flex-grow: 1;
      height: ${HeightChart[_height.xl]};
      overflow: auto;
    }

    ${device.break(ZSizeFixed.Large)} {
      & {
        height: ${_height.lg === ZSizeVaried.Full ? "100%" : undefined};
        margin-bottom: ${marginFor(_height.lg)};
        margin-left: ${marginFor(_width.lg)};
        margin-right: ${marginFor(_width.lg)};
        margin-top: ${marginFor(_height.lg)};
        width: ${WidthChart[_width.lg]};

        .ZDialog-content {
          height: ${HeightChart[_height.lg]};
        }
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      & {
        height: ${_height.md === ZSizeVaried.Full ? "100%" : undefined};
        margin-bottom: ${marginFor(_height.md)};
        margin-left: ${marginFor(_width.md)};
        margin-right: ${marginFor(_width.md)};
        margin-top: ${marginFor(_height.md)};
        width: ${WidthChart[_width.md]};

        .ZDialog-content {
          height: ${HeightChart[_height.md]};
        }
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      & {
        height: ${_height.sm === ZSizeVaried.Full ? "100%" : undefined};
        margin-bottom: ${marginFor(_height.sm)};
        margin-left: ${marginFor(_width.sm)};
        margin-right: ${marginFor(_width.sm)};
        margin-top: ${marginFor(_height.sm)};
        width: ${WidthChart[_width.sm]};

        .ZDialog-content {
          height: ${HeightChart[_height.sm]};
        }
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      & {
        height: ${_height.xs === ZSizeVaried.Full ? "100%" : undefined};
        margin-bottom: ${marginFor(_height.xs)};
        margin-left: ${marginFor(_width.xs)};
        margin-right: ${marginFor(_width.xs)};
        margin-top: ${marginFor(_height.xs)};
        width: ${WidthChart[_width.xs]};

        .ZDialog-content {
          height: ${HeightChart[_height.xs]};
        }
      }
    }
  `);

  const jsx = (
    <dialog
      className={cssJoinDefined(
        "ZDialog-root",
        "ZDialog-modal",
        className,
        _className,
      )}
      onClick={closeOnBackdropClick}
      onKeyDown={closeOnEscapeKey}
      data-name={name}
      data-fashion={fashion?.name}
      role="dialog"
      ref={modal}
    >
      {renderHeader && (
        <div className="ZDialog-header" aria-description="Modal Header">
          {renderHeader?.call(null)}
        </div>
      )}
      <div className="ZDialog-content" aria-description="Modal Body">
        {children}
      </div>
      {renderFooter && (
        <div className="ZDialog-footer" aria-description="Modal Footer">
          {renderFooter?.call(null)}
        </div>
      )}
    </dialog>
  );

  return jsx;
}
