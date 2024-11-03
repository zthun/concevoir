import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import {
  css,
  cssJoinDefined,
  firstDefined,
  pickDataAttributes,
  ZOrientation,
} from "@zthun/helpful-fn";
import { IZComponentAdornment } from "../component/component-adornment.mjs";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { ZFlex } from "../stack/flex";
import { ZStack } from "../stack/stack";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled";

export interface IZChip
  extends IZComponentFashion,
    IZComponentHierarchy,
    IZComponentAdornment,
    IZComponentStyle {}

export function ZChip(props: IZChip) {
  const tailor = useFashionTailor();
  const { component } = useFashionTheme();
  const { children, className, fashion, prefix, suffix } = props;
  const picker = new ZColorPicker(firstDefined(component, fashion));

  const _className = useCss(css`
    & {
      background-color: ${picker.idle.main};
      border-radius: ${tailor.rounding(ZSizeFixed.Small)};
      color: ${picker.idle.contrast};
      padding: ${tailor.gap(ZSizeFixed.ExtraSmall)};
    }

    .ZChip-prefix,
    .ZChip-suffix {
      display: inline-flex;
    }
  `);

  return (
    <ZStack
      align={{ items: "center" }}
      className={cssJoinDefined("ZChip-root", _className, className)}
      data-fashion={fashion?.name}
      orientation={ZOrientation.Horizontal}
      gap={ZSizeFixed.ExtraSmall}
      {...pickDataAttributes(props)}
    >
      {prefix && <div className="ZChip-prefix">{prefix}</div>}
      <ZFlex grow={1} className="ZChip-body">
        {children}
      </ZFlex>
      {suffix && <div className="ZChip-suffix">{suffix}</div>}
    </ZStack>
  );
}
