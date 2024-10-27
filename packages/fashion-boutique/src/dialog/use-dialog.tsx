import { ZCircusKeyboardQwerty } from "@zthun/cirque";
import { sleep } from "@zthun/helpful-fn";
import { KeyboardEvent, MouseEvent, ReactNode, useEffect } from "react";
import { IZComponentCompact } from "../component/component-compact.mjs";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";

export interface IZDialog
  extends IZComponentFashion,
    IZComponentHierarchy,
    IZComponentName,
    IZComponentCompact,
    IZComponentStyle {
  open: boolean;
  persistent?: boolean;

  onClose?: () => void;

  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;
}

export interface IUseDialogOptions {
  onBeforeOpen?: () => Promise<void>;
  onAfterOpen?: () => Promise<void>;
}

export function useDialog(
  current: HTMLDialogElement | null,
  props: IZDialog,
  options?: IUseDialogOptions,
) {
  const { open, onClose, persistent } = props;

  const show = async () => {
    await options?.onBeforeOpen?.call(null);
    current?.showModal?.call(current);
    await options?.onAfterOpen?.call(null);
    current?.focus?.call(current);
  };

  const hide = async () => {
    if (!current?.open) {
      // Already closed
      return;
    }

    current?.classList.add("closing");
    await sleep(150);
    current?.close?.call(current);
    current?.classList.remove("closing");
    onClose?.call(null);
  };

  // This next bit is nearly impossible to test without modification
  // to circus to click on an offset of the body.  Can be done, but needs to come later.
  /* istanbul ignore next --@preserve */
  const closeOnBackdropClick = (e: MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();

    const inside =
      r.top <= e.clientY &&
      e.clientY <= r.bottom &&
      r.left <= e.clientX &&
      e.clientX <= r.right;

    if (!inside && !persistent) {
      hide();
    }
  };

  const closeOnEscapeKey = (e: KeyboardEvent) => {
    if (e.code !== ZCircusKeyboardQwerty.escape.code) {
      return;
    }

    e.preventDefault();

    if (persistent) {
      return;
    }

    hide();
  };

  useEffect(() => {
    if (open) {
      show();
    } else {
      hide();
    }
  }, [current, open]);

  return { closeOnBackdropClick, closeOnEscapeKey };
}
