import { cssJoinDefined } from "@zthun/helpful-fn";
import { useKeyboardActivate } from "@zthun/helpful-react";
import { IZIcon, useIconProvider, useIconStyles } from "./icon";

export const ZIconMaterialProvider =
  "https://fonts.googleapis.com/icon?family=Material+Icons";
export const ZIconMaterialVendor = "material";

export function ZIconMaterial(props: IZIcon) {
  const { name, fashion, className, onClick } = props;
  const _className = useIconStyles(props);
  useIconProvider(ZIconMaterialProvider);
  const { onKey, tabIndex } = useKeyboardActivate(onClick);

  return (
    <span
      className={cssJoinDefined(
        "ZIcon-root",
        "ZIcon-material",
        "material-icons",
        className,
        _className,
      )}
      onClick={onClick}
      onKeyDown={onKey}
      tabIndex={tabIndex}
      data-fashion={fashion?.name}
      data-name={name}
      data-vendor={ZIconMaterialVendor}
    >
      {name}
    </span>
  );
}
