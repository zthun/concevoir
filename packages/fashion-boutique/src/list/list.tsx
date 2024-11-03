import { ZSizeFixed, ZSizeVoid } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { css, cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { IZComponentCompact } from "../component/component-compact.mjs";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled";

/**
 * Represents properties for the ZList component.
 */
export interface IZList
  extends IZComponentHierarchy,
    IZComponentCompact,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentName {}

/**
 * Represents a vertical list component.
 *
 * @param props -
 *        The properties for this list.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZList(props: IZList) {
  const { primary } = useFashionTheme();
  const tailor = useFashionTailor();
  const { className, children, fashion, name, compact } = props;
  const _fashion = firstDefined(primary, fashion);
  const picker = new ZColorPicker(_fashion);

  const _className = useCss(css`
    & {
      border: ${tailor.thickness(ZSizeFixed.ExtraSmall)} solid transparent;
      list-style: none;
      margin: 0;
      padding: ${tailor.gap(compact ? ZSizeVoid.None : ZSizeFixed.ExtraSmall)};
    }

    li[data-highlight="true"] {
      background-color: ${picker.idle.main};
      border-color: ${picker.idle.border};
      color: ${picker.idle.contrast};
    }

    li[data-interactive]:hover {
      background-color: ${picker.hover.main};
      border-color: ${picker.hover.border};
      color: ${picker.hover.contrast};
    }

    li[data-interactive]:focus {
      background-color: ${picker.focus.main};
      border-color: ${picker.focus.border};
      color: ${picker.focus.contrast};
      outline: none;
    }
  `);

  return (
    <ul
      className={cssJoinDefined("ZList-root", className, _className)}
      data-name={name}
      data-fashion={_fashion.name}
      role="list"
    >
      {children}
    </ul>
  );
}
