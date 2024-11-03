import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { css, cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled";

export interface IZBanner
  extends IZComponentHierarchy,
    IZComponentFashion,
    IZComponentStyle {}

export function ZBanner(props: IZBanner) {
  const { primary } = useFashionTheme();
  const tailor = useFashionTailor();

  const { children, className, fashion } = props;
  const picker = new ZColorPicker(firstDefined(primary, fashion));
  const _className = useCss(css`
    &.ZBanner-root {
      background: ${picker.idle.main};
      box-sizing: border-box;
      color: ${picker.idle.contrast};
      left: 0;
      padding: ${tailor.gap(ZSizeFixed.ExtraSmall)}
        ${tailor.gap(ZSizeFixed.Small)};
      position: sticky;
      right: 0;
      top: 0;
      z-index: 1100;
    }
  `);

  return (
    <div
      className={cssJoinDefined("ZBanner-root", className, _className)}
      role="banner"
    >
      {children}
    </div>
  );
}
