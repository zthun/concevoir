import { ReactNode } from "react";

import { IZFashion, ZColorPicker } from "@zthun/fashion-theme";

import { css, keyframes } from "@emotion/css";
import {
  createSizeChartVariedCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { cssJoinDefined, firstDefined, ZOrientation } from "@zthun/helpful-fn";
import { IZComponentAvatar } from "../component/component-avatar.mjs";
import { IZComponentDisabled } from "../component/component-disabled.mjs";
import { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentLabel } from "../component/component-label.mjs";
import { IZComponentLoading } from "../component/component-loading.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import { ZStack } from "../stack/stack";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";

export interface IZButton
  extends IZComponentAvatar,
    IZComponentLabel,
    IZComponentDomEvents<HTMLButtonElement>,
    IZComponentDisabled,
    IZComponentLoading,
    IZComponentStyle,
    IZComponentName,
    IZComponentFashion<IZFashion>,
    IZComponentWidth<ZSizeVaried, ZSizeVaried> {
  borderless?: boolean;
  compact?: boolean;
  outline?: boolean;
  tooltip?: ReactNode;
}

const WidthChart = createSizeChartVariedCss();

/**
 * Represents a basic button component.
 *
 * @param props -
 *        The properties for this button.
 *
 * @returns The JSX to render this button.
 */
export function ZButton(props: IZButton) {
  const {
    avatar,
    className,
    borderless,
    compact,
    disabled,
    fashion,
    loading,
    label,
    name,
    outline,
    width,
    ...dom
  } = props;
  const device = useFashionDevice();
  const { component } = useFashionTheme();
  const tailor = useFashionTailor();
  const picker = new ZColorPicker(firstDefined(component, fashion));
  const _width = new ZDeviceValues(width, ZSizeVaried.Fit);

  const _gradient = keyframes`
      0% { background-position-x: 0%; }
      50% { background-position-x: 100%; }
      100% { background-position-x: 0%; }
  `;

  const _className = css`
    & {
      border-radius: 0.375rem;
      display: inline-flex;
      font-family: inherit;
      font-size: inherit;
      gap: ${tailor.gap(ZSizeFixed.ExtraSmall)};
      justify-content: center;
      overflow: hidden;
      position: relative;
      background: ${outline ? "transparent" : picker.idle.main};
      border-color: ${picker.idle.main};
      border-style: ${borderless ? "none" : "solid"};
      color: ${outline ? picker.idle.main : picker.idle.contrast};
      padding: ${compact ? 0 : tailor.gap(ZSizeFixed.ExtraSmall)};
      width: ${WidthChart[_width.xl]};
    }

    &:focus {
      outline-style: solid;
      outline-width: ${tailor.thickness(ZSizeFixed.Medium)};
      border-color: ${picker.focus.main};
      outline-color: ${picker.focus.border};
    }

    &:hover:not([disabled]) {
      background-color: ${picker.hover.main};
      border-color: ${picker.hover.border};
      color: ${picker.hover.contrast};
      cursor: pointer;
    }

    &:active:not([disabled]) {
      background-color: ${picker.active.main};
      border-color: ${picker.active.border};
      color: ${picker.active.contrast};
    }

    &:disabled {
      opacity: 0.25;
    }

    &[data-loading="true"] {
      animation: ${_gradient} 1.5s linear infinite;
    }

    &[data-loading="true"] {
      background: linear-gradient(
        90deg,
        ${picker.idle.main},
        ${picker.idle.border},
        ${picker.idle.main}
      );
      background-size: 300% 100%;
    }

    ${device.break(ZSizeFixed.Large)} {
      & {
        width: ${WidthChart[_width.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      & {
        width: ${WidthChart[_width.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      & {
        width: ${WidthChart[_width.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      & {
        width: ${WidthChart[_width.xs]};
      }
    }
  `;

  return (
    <button
      {...dom}
      className={cssJoinDefined("ZButton-root", className, _className)}
      disabled={disabled}
      name={name}
      data-borderless={borderless}
      data-compact={compact}
      data-fashion={fashion?.name}
      data-loading={loading}
      data-outline={outline}
    >
      <ZStack
        alignItems="center"
        orientation={ZOrientation.Horizontal}
        gap={ZSizeFixed.Small}
        inline
      >
        {avatar}
        <div>{label}</div>
      </ZStack>
    </button>
  );
}
