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
import { useFashionDevice, useFashionTheme } from "../theme/fashion.mjs";
import { IZSuspense } from "./suspense.mjs";

export interface IZSuspenseProgress extends IZSuspense {
  height?: ZDeviceValue<ZSizeVaried.Full | ZSizeFixed>;
}

const HeightChart = createSizeChartFixedCss(
  createSizeChartFixedArithmetic(0.25, 0.25),
  "rem",
);

/**
 * Renders a line bar suspense.
 *
 * @param props -
 *        The properties for the component.
 *
 * @returns The jsx for the component.
 */
export function ZSuspenseProgress(props: IZSuspenseProgress) {
  const { className, disabled, height, name, fashion } = props;
  const { primary } = useFashionTheme();
  const device = useFashionDevice();
  const _fashion = firstDefined(primary, fashion);
  const _height = new ZDeviceValues(height, ZSizeFixed.Medium);
  const picker = new ZColorPicker(_fashion);

  const scroll = keyframes`
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(400%);
    }
  `;

  const _className = css`
    & {
      background-color: currentcolor;
      box-sizing: border-box;
      display: ${disabled ? "none" : "block"};
      height: ${HeightChart[_height.xl]};
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .ZSuspense-progress-scroll {
      animation: ${scroll} 1.5s ease-in-out infinite;
      position: absolute;
      background-color: ${picker.idle.main};
      inset: 0;
      width: 25%;
    }

    ${device.break(ZSizeFixed.Large)} {
      & {
        height: ${HeightChart[_height.lg]};
      }
    }
    ${device.break(ZSizeFixed.Medium)} {
      & {
        height: ${HeightChart[_height.md]};
      }
    }
    ${device.break(ZSizeFixed.Small)} {
      & {
        height: ${HeightChart[_height.sm]};
      }
    }
    ${device.break(ZSizeFixed.ExtraSmall)} {
      & {
        height: ${HeightChart[_height.xs]};
      }
    }
  `;

  return (
    <div
      className={cssJoinDefined(
        "ZSuspense-root",
        "ZSuspense-progress",
        className,
        _className,
      )}
      data-disabled={disabled}
      data-fashion={_fashion.name}
      data-name={name}
    >
      <div className="ZSuspense-progress-scroll" />
    </div>
  );
}
