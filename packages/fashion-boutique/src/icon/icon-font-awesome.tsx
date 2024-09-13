import { cssJoinDefined } from "@zthun/helpful-fn";
import { useKeyboardActivate } from "@zthun/helpful-react";
import { IZIcon, useIconProvider, useIconStyles } from "./icon";

export const ZIconFontAwesomeProvider =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css";
export const ZIconFontAwesomeVendor = "font-awesome";

export interface IZIconFontAwesome extends IZIcon {
  animation?:
    | "beat"
    | "fade"
    | "beat-fade"
    | "bounce"
    | "flip"
    | "shake"
    | "spin";
  family?: "classic" | "sharp" | "brands";
  style?: "solid" | "regular" | "duotone" | "light" | "thin";
}

export function ZIconFontAwesome(props: IZIconFontAwesome) {
  const {
    name,
    className,
    animation,
    family = "classic",
    style = "solid",
    onClick,
    fashion,
  } = props;
  const _className = useIconStyles(props);
  useIconProvider(ZIconFontAwesomeProvider);
  const { onKey, tabIndex } = useKeyboardActivate(onClick);
  const _animation = animation ? `fa-${animation}` : undefined;

  return (
    <span
      className={cssJoinDefined(
        "ZIcon-root",
        "ZIcon-font-awesome",
        `fa-${family}`,
        `fa-${style}`,
        `fa-${name}`,
        _animation,
        className,
        _className,
      )}
      onClick={onClick}
      onKeyDown={onKey}
      tabIndex={tabIndex}
      data-fashion={fashion?.name}
      data-family={family}
      data-style={style}
      data-name={name}
      data-vendor={ZIconFontAwesomeVendor}
    />
  );
}
