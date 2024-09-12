import { css } from "@emotion/css";
import { IZFashion, ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import { IZComponentLabel } from "../component/component-label.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTheme } from "../theme/fashion.mjs";
import { ZParagraph } from "../typography/typography";

export interface IZLink
  extends IZComponentStyle,
    IZComponentDomEvents<HTMLAnchorElement>,
    IZComponentName,
    IZComponentLabel {
  fashion?: IZFashion;
  href?: string;
}

export function ZLink(props: IZLink) {
  const { primary } = useFashionTheme();
  const { className, name, href, fashion, label, ...rest } = props;
  const picker = new ZColorPicker(firstDefined(primary, fashion));

  const _className = css`
    & {
      color: ${picker.idle.main};
      text-decoration: none;
    }

    &:active {
      color: ${picker.active.main};
    }

    &:hover {
      color: ${picker.hover.main};
    }

    &:focus {
      color: ${picker.focus.main};
    }
  `;

  return (
    <a
      {...rest}
      className={cssJoinDefined("ZLink-root", className, _className)}
      href={href}
      data-name={name}
      role="link"
    >
      <ZParagraph Element="div" compact>
        {label}
      </ZParagraph>
    </a>
  );
}
