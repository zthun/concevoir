import { Popover } from "@mui/material";
import {
  ZHorizontalAnchor,
  ZVerticalAnchor,
  cssJoinDefined,
} from "@zthun/helpful-fn";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";

/**
 * Represents props for a popup component.
 */
export interface IZPopup extends IZComponentHierarchy, IZComponentStyle {
  /**
   * The position the popup is attached to.
   *
   * If this is falsy, then the popup is closed.
   */
  attach?: Element | null;

  /**
   * The callback for when the popup requests to be closed.
   */
  onClose?(): void;

  /**
   * The origin point at which to popup opens relative to the
   * popup position.
   *
   * If the attach is an element, this is the origin on that element. If it is
   * a point, then this is ignored and it is opened at that point.
   */
  attachOrigin?: [ZVerticalAnchor, ZHorizontalAnchor];

  /**
   * The origin of the popup relative to the attach point or attachOrigin.
   *
   * This is the point that is referenced on the popup which is consistent every
   * time it is opened, regardless of the popup content.
   */
  popupOrigin?: [ZVerticalAnchor, ZHorizontalAnchor];
}

/**
 * Represents a popup that houses content.
 *
 * @param props -
 *        The properties for the popup.
 *
 * @returns
 *        The JSX to render the popup content.
 */
export function ZPopup(props: IZPopup) {
  const {
    className,
    children,
    attach,
    attachOrigin = [ZVerticalAnchor.Bottom, ZHorizontalAnchor.Left],
    popupOrigin = [ZVerticalAnchor.Top, ZHorizontalAnchor.Left],
    onClose,
  } = props;
  const [attachVertical, attachHorizontal] = attachOrigin;
  const [popupVertical, popupHorizontal] = popupOrigin;

  const _attachVertical: "center" | "top" | "bottom" =
    attachVertical === ZVerticalAnchor.Middle ? "center" : attachVertical;

  const _popupVertical: "center" | "top" | "bottom" =
    popupVertical === ZVerticalAnchor.Middle ? "center" : popupVertical;

  return (
    <Popover
      className={cssJoinDefined("ZPopup-root", className)}
      anchorEl={attach}
      open={!!attach}
      onClose={onClose}
      anchorOrigin={{ vertical: _attachVertical, horizontal: attachHorizontal }}
      transformOrigin={{
        vertical: _popupVertical,
        horizontal: popupHorizontal,
      }}
    >
      <div className="ZPopup-content">{children}</div>
    </Popover>
  );
}
