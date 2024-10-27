import { css } from "@emotion/css";
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import {
  cssJoinDefined,
  firstDefined,
  ZHorizontalAnchor,
  ZQuadrilateralBuilder,
  ZRectangle,
  ZVerticalAnchor,
} from "@zthun/helpful-fn";
import { useWindowService } from "@zthun/helpful-react";
import { useCallback, useEffect, useRef } from "react";
import { IZComponentHeight } from "../component/component-height.mjs";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";
import { IZDialog, useDialog } from "./use-dialog";

export interface IZPopup
  extends IZDialog,
    IZComponentHeight<ZSizeFixed | ZSizeVaried> {
  attach?: Element | null;
  attachOrigin?: [ZVerticalAnchor, ZHorizontalAnchor];
  popupOrigin?: [ZVerticalAnchor, ZHorizontalAnchor];
  scrollContainer?: Element;
}

const HeightChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(5, 10), "rem"),
  ...createSizeChartVariedCss(),
  [ZSizeVaried.Fit]: "fit-content",
};

export function ZPopup(props: IZPopup) {
  const {
    className,
    children,
    compact,
    fashion,
    attach,
    attachOrigin = [ZVerticalAnchor.Bottom, ZHorizontalAnchor.Left],
    popupOrigin = [ZVerticalAnchor.Top, ZHorizontalAnchor.Left],
    name,
    height,
    scrollContainer = document.documentElement,
    renderHeader,
    renderFooter,
  } = props;
  const { component } = useFashionTheme();
  const device = useFashionDevice();
  const tailor = useFashionTailor();
  const popup = useRef<HTMLDialogElement>(document.createElement("dialog"));
  const picker = new ZColorPicker(firstDefined(component, fashion));
  const _window = useWindowService();
  const _height = new ZDeviceValues(height, ZSizeVaried.Fit);

  const _getAttach = useCallback(
    () => firstDefined(document.body, attach, popup.current?.parentElement),
    [attach],
  );

  const _resize = useCallback(() => {
    const _popup = popup.current;
    const _attach = _getAttach();

    const attachRectangle = new ZQuadrilateralBuilder(0)
      .copy(_attach.getBoundingClientRect())
      .build();

    _popup.style.minWidth = `${new ZRectangle(attachRectangle).width()}px`;

    return Promise.resolve();
  }, [_getAttach]);

  const _reposition = useCallback(() => {
    const _popup = popup.current;
    const _attach = _getAttach();

    const attachRectangle = new ZQuadrilateralBuilder(0)
      .copy(_attach.getBoundingClientRect())
      .build();
    const popupRectangle = new ZQuadrilateralBuilder(0)
      .copy(_popup.getBoundingClientRect())
      .build();

    const { left, top } = new ZRectangle(attachRectangle).attach(
      attachOrigin,
      popupRectangle,
      popupOrigin,
    );

    _popup.style.left = `${left}px`;
    _popup.style.top = `${top}px`;

    return Promise.resolve();
  }, [_getAttach]);

  const _adjust = useCallback(async () => {
    const container = new ZQuadrilateralBuilder(0)
      .bottom(scrollContainer.clientHeight)
      .right(scrollContainer.clientWidth)
      .build();

    const popupRectangle = new ZQuadrilateralBuilder(0)
      .copy(popup.current.getBoundingClientRect())
      .build();

    const adjusted = new ZRectangle(container).offsetToFit(popupRectangle);

    popup.current.style.left = `${adjusted.left}px`;
    popup.current.style.top = `${adjusted.top}px`;

    return Promise.resolve();
  }, [scrollContainer]);

  const onAfterOpen = useCallback(async () => {
    await _resize();
    await _reposition();
    await _adjust();
  }, [attach, popup.current, scrollContainer]);

  const { closeOnBackdropClick, closeOnEscapeKey } = useDialog(
    popup.current,
    props,
    { onAfterOpen },
  );

  const _className = css`
    & {
      background-color: ${component.idle.main};
      border-color: ${component.idle.border};
      border-radius: ${tailor.rounding(ZSizeFixed.ExtraSmall)};
      border-style: solid;
      border-width: ${tailor.thickness(ZSizeFixed.ExtraSmall)};
      color: ${component.idle.contrast};
      padding: 0;
      margin: 0;
      z-index: 1000;
    }

    &::backdrop,
    &.closing {
      opacity: 0;
    }

    &[open] {
      display: flex;
      flex-direction: column;
    }

    .ZDialog-header,
    .ZDialog-footer,
    .ZDialog-content {
      padding: ${tailor.gap(
        compact ? ZSizeFixed.ExtraSmall : ZSizeFixed.Small,
      )};
    }

    .ZDialog-header {
      background-color: ${picker.idle.main};
      color: ${picker.idle.contrast};
    }

    .ZDialog-content {
      flex-grow: 1;
      overflow: auto;
      max-height: ${HeightChart[_height.xl]};
    }

    ${device.break(ZSizeFixed.Large)} {
      max-height: ${HeightChart[_height.lg]};
    }

    ${device.break(ZSizeFixed.Medium)} {
      max-height: ${HeightChart[_height.md]};
    }

    ${device.break(ZSizeFixed.Small)} {
      max-height: ${HeightChart[_height.sm]};
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      max-height: ${HeightChart[_height.xs]};
    }
  `;

  useEffect(() => {
    return ((onRedraw) => {
      _window.removeEventListener("resize", onRedraw);
      _window.removeEventListener("scroll", onRedraw);
      _window.addEventListener("resize", onRedraw);
      _window.addEventListener("scroll", onRedraw);

      return () => {
        _window.removeEventListener("resize", onRedraw);
        _window.removeEventListener("scroll", onRedraw);
      };
    })(onAfterOpen);
  }, [onAfterOpen, _window]);

  return (
    <dialog
      className={cssJoinDefined(
        "ZDialog-root",
        "ZDialog-popup",
        className,
        _className,
      )}
      onClick={closeOnBackdropClick}
      onKeyDown={closeOnEscapeKey}
      data-name={name}
      data-fashion={fashion?.name}
      ref={popup}
    >
      {renderHeader && (
        <div className="ZDialog-header" aria-description="Drawer Header">
          {renderHeader?.call(null)}
        </div>
      )}
      <div className="ZDialog-content" aria-description="Drawer Body">
        {children}
      </div>
      {renderFooter && (
        <div className="ZDialog-footer" aria-description="Drawer Footer">
          {renderFooter?.call(null)}
        </div>
      )}
    </dialog>
  );
}
