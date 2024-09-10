import { css } from "@emotion/css";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { useFashionTailor } from "../theme/fashion.mjs";

export function ZFullScreen(props: IZComponentHierarchy) {
  const tailor = useFashionTailor();
  const { children } = props;

  const _className = css`
    & {
      padding: ${tailor.gap()};
      position: absolute;
      inset: 0;
    }
  `;

  return (
    <div className={cssJoinDefined("ZFullScreen-root", _className)}>
      {children}
    </div>
  );
}
