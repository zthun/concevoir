import { css } from "@emotion/css";
import { ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTheme } from "../theme/fashion.mjs";

export interface IZBanner
  extends IZComponentHierarchy,
    IZComponentFashion,
    IZComponentStyle {}

export function ZBanner(props: IZBanner) {
  const { primary } = useFashionTheme();
  const { children, className, fashion } = props;
  const picker = new ZColorPicker(firstDefined(primary, fashion));
  const _className = css`
    &.ZBanner-root {
      background: ${picker.idle.main};
      box-sizing: border-box;
      color: ${picker.idle.contrast};
      left: 0;
      position: sticky;
      right: 0;
      top: 0;
      z-index: 1100;
    }
  `;

  return (
    <div
      className={cssJoinDefined("ZBanner-root", className, _className)}
      role="banner"
    >
      {children}
    </div>
  );
}
