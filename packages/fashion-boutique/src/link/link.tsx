import { css } from "@emotion/css";
import { IZFashion, ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { noop } from "lodash-es";
import { IZComponentLabel } from "../component/component-label.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTheme } from "../theme/fashion.mjs";
import { ZParagraph } from "../typography/typography";

export interface IZLink
  extends IZComponentStyle,
    IZComponentName,
    IZComponentLabel {
  fashion?: IZFashion;
  href?: string;
  onClick?(href: string): void;
}

export function ZLink(props: IZLink) {
  const { primary } = useFashionTheme();
  const { className, name, href, fashion, label, onClick = noop } = props;
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

  const handleClick = () => {
    onClick(href);
  };

  return (
    <a
      className={cssJoinDefined("ZLink-root", className, _className)}
      href={href}
      data-name={name}
      onClick={handleClick}
      role="link"
    >
      <ZParagraph Element="div" compact>
        {label}
      </ZParagraph>
    </a>
  );
}
