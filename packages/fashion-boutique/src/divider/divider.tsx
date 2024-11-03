import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { IZComponentCompact } from "../component/component-compact.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTailor } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled";

export interface IZDivider extends IZComponentStyle, IZComponentCompact {}

export function ZDivider(props: IZDivider) {
  const tailor = useFashionTailor();
  const { className, compact } = props;

  const _className = useCss(css`
    & {
      color: inherit;
      margin: ${compact ? 0 : tailor.gap()};
      margin-left: 0;
      margin-right: 0;
    }
  `);

  return (
    <hr className={cssJoinDefined("ZDivider-root", _className, className)} />
  );
}
