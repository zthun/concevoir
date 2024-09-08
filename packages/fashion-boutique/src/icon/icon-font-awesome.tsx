import { Tooltip } from "@mui/material";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { useKeyboardActivate } from "@zthun/helpful-react";
import { IZIcon, useIconProvider, useIconStyles } from "./icon";

export const ZIconFontAwesomeProvider =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
export const ZIconFontAwesomeVendor = "font-awesome";

export interface IZIconFontAwesome extends IZIcon {
  family?: "classic" | "sharp" | "brands";
  style?: "solid" | "regular" | "duotone" | "light" | "thin";
}

export function ZIconFontAwesome(props: IZIconFontAwesome) {
  const {
    name,
    className,
    family = "classic",
    style = "solid",
    onClick,
    fashion,
    tooltip,
  } = props;
  const { classes } = useIconStyles(props);
  useIconProvider(ZIconFontAwesomeProvider);
  const { onKey, tabIndex } = useKeyboardActivate(onClick);

  return (
    <Tooltip title={tooltip}>
      <span
        className={cssJoinDefined(
          "ZIcon-root",
          "ZIcon-font-awesome",
          `fa-${family}`,
          `fa-${style}`,
          `fa-${name}`,
          className,
          classes.root,
        )}
        onClick={onClick}
        onKeyDown={onKey}
        tabIndex={tabIndex}
        data-fashion={fashion?.name}
        data-family={family}
        data-style={style}
        data-name={name}
        data-vendor={ZIconFontAwesomeVendor}
      ></span>
    </Tooltip>
  );
}
