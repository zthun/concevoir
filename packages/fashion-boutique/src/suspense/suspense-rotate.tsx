import { css, keyframes } from "@emotion/css";
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  ZDeviceValue,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";
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
  const device = useFashionDevice();
  const tailor = useFashionTailor();
  const _width = new ZDeviceValues(width, ZSizeFixed.Medium);
  const _fashion = firstDefined(inherit, fashion);
  const picker = new ZColorPicker(_fashion);

  const rotating = keyframes`
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  `;

  const _className = css`
    & {
      animation: ${rotating} 1s ease-in-out infinite;
      border-color: ${picker.idle.border};
      border-radius: ${tailor.rounding(ZSizeVaried.Full)};
      border-style: dashed;
      box-shadow: 0 0 0.25rem ${picker.idle.main};
      display: ${disabled ? "none" : "block"};
      height: ${WidthChart[_width.xl]};
      width: ${WidthChart[_width.xl]};
    }

    ${device.break(ZSizeFixed.Large)} {
      & {
        height: ${WidthChart[_width.lg]};
        width: ${WidthChart[_width.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      & {
        height: ${WidthChart[_width.md]};
        width: ${WidthChart[_width.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      & {
        height: ${WidthChart[_width.sm]};
        width: ${WidthChart[_width.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      & {
        height: ${WidthChart[_width.xs]};
        width: ${WidthChart[_width.xs]};
      }
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
      data-width={width}
      data-height={ZSizeVaried.Fit}
      data-fashion={_fashion}
    />
  );
}
