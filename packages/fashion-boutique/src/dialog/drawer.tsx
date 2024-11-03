import { ZSizeFixed } from "@zthun/fashion-tailor";
import { black, ZColorPicker } from "@zthun/fashion-theme";
import {
  css,
  cssJoinDefined,
  firstDefined,
  ZHorizontalAnchor,
  ZSideAnchor,
  ZVerticalAnchor,
} from "@zthun/helpful-fn";
import { useRef } from "react";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { useCss, useKeyframes } from "../theme/styled";
import { IZDialog, useDialog } from "./use-dialog";

export interface IZDrawer extends IZDialog {
  anchor?: ZSideAnchor;
}

export function ZDrawer(props: IZDrawer) {
  const {
    anchor,
    className,
    children,
    fashion,
    name,
    renderHeader,
    renderFooter,
  } = props;
  const { surface } = useFashionTheme();
  const tailor = useFashionTailor();
  const drawer = useRef<HTMLDialogElement>(null);
  const picker = new ZColorPicker(firstDefined(surface, fashion));

  const { closeOnBackdropClick, closeOnEscapeKey } = useDialog(
    drawer.current,
    props,
  );

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

  const _slideIn = useKeyframes(css`
    from {
      transform: ${transformHide};
    }
    to {
      transform: ${transformShow};
    }
  `);

  const _className = useCss(css`
    & {
      background-color: ${surface.idle.main};
      border: 0;
      color: ${surface.idle.contrast};
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

    &::backdrop {
      background-color: ${black()};
      opacity: 0.75;
    }

    &[open] {
      animation: ${_slideIn} 200ms linear;
      transform: ${transformShow};
      display: flex;
      flex-direction: column;
    }

    &.closing {
      transform: ${transformHide};
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
      overflow: auto;
    }
  `);

  return (
    <dialog
      className={cssJoinDefined(
        "ZDialog-root",
        "ZDialog-drawer",
        className,
        _className,
      )}
      onClick={closeOnBackdropClick}
      onKeyDown={closeOnEscapeKey}
      data-anchor={anchor}
      data-name={name}
      data-fashion={fashion?.name}
      role="dialog"
      ref={drawer}
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
