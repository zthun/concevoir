import { css } from "@emotion/css";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { Property } from "csstype";
import { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTailor } from "../theme/fashion.mjs";

export interface IZListItem
  extends IZComponentName,
    IZComponentStyle,
    IZComponentHierarchy,
    IZComponentDomEvents<HTMLLIElement> {
  cursor?: Property.Cursor;
  compact?: boolean;
  interactive?: boolean;
}

export function ZListItem(props: IZListItem) {
  const tailor = useFashionTailor();
  const { children, className, compact, cursor, interactive, name, ...dom } =
    props;

  const py = tailor.gap(ZSizeFixed.Small);
  const px = compact
    ? tailor.gap(ZSizeFixed.Small)
    : tailor.gap(ZSizeFixed.Large);

  const _className = css`
    & {
      box-sizing: border-box;
      cursor: ${cursor};
      padding: ${py} ${px};
      width: 100%;
    }
  `;

  return (
    <li
      {...dom}
      className={cssJoinDefined("ZListItem-root", _className, className)}
      data-name={name}
      data-interactive={interactive}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
    </li>
  );
}
