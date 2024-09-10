import { css } from "@emotion/css";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentRequired } from "../component/component-required.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";

export interface IZLabel
  extends IZComponentHierarchy,
    IZComponentStyle,
    IZComponentRequired {
  htmlFor?: string;
}

export function ZLabel(props: IZLabel) {
  const { error } = useFashionTheme();
  const tailor = useFashionTailor();
  const { children, className, required, htmlFor } = props;

  const _className = css`
    & {
      display: block;
      font-weight: bold;
    }

    &[data-required="true"]::after {
      content: "*";
      color: ${error.idle.main};
      margin-left: ${tailor.thickness(ZSizeFixed.Medium)};
    }
  `;

  return (
    <label
      className={cssJoinDefined("ZLabel-root", className, _className)}
      htmlFor={htmlFor}
      data-required={required}
    >
      {children}
    </label>
  );
}
