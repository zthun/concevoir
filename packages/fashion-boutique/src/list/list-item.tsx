import { ZSizeFixed } from "@zthun/fashion-tailor";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { Property } from "csstype";
import { IZComponentCompact } from "../component/component-compact.mjs";
import { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTailor } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled";

export interface IZListItem
  extends IZComponentName,
    IZComponentStyle,
    IZComponentHierarchy,
    IZComponentCompact,
    IZComponentDomEvents<HTMLLIElement> {
  cursor?: Property.Cursor;
  interactive?: boolean;
  highlight?: boolean;
}

export function ZListItem(props: IZListItem) {
  const tailor = useFashionTailor();
  const {
    children,
    className,
    compact,
    cursor,
    interactive,
    name,
    highlight,
    ...dom
  } = props;

  const py = compact
    ? tailor.gap(ZSizeFixed.ExtraSmall)
    : tailor.gap(ZSizeFixed.Small);
  const px = compact
    ? tailor.gap(ZSizeFixed.ExtraSmall)
    : tailor.gap(ZSizeFixed.Large);

  const _className = useCss(css`
    & {
      box-sizing: border-box;
      cursor: ${cursor};
      padding: ${py} ${px};
      width: 100%;
    }
  `);

  return (
    <li
      {...dom}
      className={cssJoinDefined("ZListItem-root", _className, className)}
      data-name={name}
      data-interactive={interactive}
      data-highlight={highlight}
      tabIndex={interactive ? 0 : undefined}
      role="listitem"
    >
      {children}
    </li>
  );
}
