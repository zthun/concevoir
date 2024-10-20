import { css } from "@emotion/css";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import {
  ZHorizontalAnchor,
  ZQuadrilateralBuilder,
  ZRectangle,
  ZVerticalAnchor,
  cssJoinDefined,
  firstDefined,
} from "@zthun/helpful-fn";
import { useRef } from "react";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { IZDialog, useDialog } from "./use-dialog";

export interface IZPopup extends IZDialog {
  attach?: Element | null;
  attachOrigin?: [ZVerticalAnchor, ZHorizontalAnchor];
  popupOrigin?: [ZVerticalAnchor, ZHorizontalAnchor];
}

export function ZPopup(props: IZPopup) {
  const {
    className,
    children,
    fashion,
    attach,
    attachOrigin = [ZVerticalAnchor.Bottom, ZHorizontalAnchor.Left],
    popupOrigin = [ZVerticalAnchor.Top, ZHorizontalAnchor.Left],
    name,
    renderHeader,
    renderFooter,
  } = props;
  const { component } = useFashionTheme();
  const tailor = useFashionTailor();
  const popup = useRef<HTMLDialogElement>(document.createElement("dialog"));
  const picker = new ZColorPicker(firstDefined(component, fashion));

  const onBeforeOpen = () => {
    const _popup = popup.current;
    const _attach = firstDefined(document.body, attach, _popup.parentElement);

    const [anchorY, anchorX] = attachOrigin;
    const [originY, originX] = popupOrigin;

    const tq = _attach.getBoundingClientRect();
    const cq = _popup.getBoundingClientRect();

    const targetRectangle = new ZRectangle(
      new ZQuadrilateralBuilder(0).right(tq.width).bottom(tq.height).build(),
    );
    const contentRectangle = new ZRectangle(
      new ZQuadrilateralBuilder(0).right(cq.width).bottom(cq.height).build(),
    );

    const { x: ax, y: ay } = targetRectangle.point([anchorY, anchorX]);
    const { x: ox, y: oy } = contentRectangle.point([originY, originX]);

    const left: number = tq.left + ax - ox;
    const top: number = tq.top + ay - oy;

    _popup.style.left = `${left}px`;
    _popup.style.top = `${top}px`;
    _popup.style.width = `${tq.width}px`;

    return Promise.resolve();
  };

  const { closeOnBackdropClick, closeOnEscapeKey } = useDialog(
    popup.current,
    props,
    { onBeforeOpen },
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
      padding: ${tailor.gap(ZSizeFixed.Small)};
    }

    .ZDialog-header {
      background-color: ${picker.idle.main};
      color: ${picker.idle.contrast};
    }

    .ZDialog-content {
      flex-grow: 1;
    }
  `;

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
