import { css } from "@emotion/css";
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  ZDeviceValue,
  ZSizeFixed,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { ZIconFontAwesome } from "src/icon/icon-font-awesome";
import { useFashionTheme } from "../theme/fashion.mjs";
import { IZSuspense } from "./suspense.mjs";

const WidthChart = createSizeChartFixedCss(
  createSizeChartFixedArithmetic(1, 1),
  "rem",
);

export interface IZSuspenseRotate extends IZSuspense {
  width?: ZDeviceValue<ZSizeFixed>;
}

/**
 * Renders a rotating circle suspense.
 *
 * @param props -
 *        The properties for the component.
 *
 * @returns The jsx for the suspense.
 */
export function ZSuspenseRotate(props: IZSuspenseRotate) {
  const { className, disabled, name, width, fashion } = props;
  const { inherit } = useFashionTheme();
  const _fashion = firstDefined(inherit, fashion);
  const picker = new ZColorPicker(_fashion);

  const _className = css`
    & {
      color: ${picker.idle.main};
      display: ${disabled ? "none" : "block"};
    }
  `;

  return (
    <div
      className={cssJoinDefined(
        "ZSuspense-root",
        "ZSuspense-rotate",
        className,
        _className,
      )}
      data-name={name}
      data-fashion={_fashion.name}
    >
      <ZIconFontAwesome
        animation="spin"
        family="classic"
        name="spinner"
        width={width}
      />
    </div>
  );
}
