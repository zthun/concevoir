import { css } from "@emotion/css";
import {
  ZDeviceValues,
  ZSizeFixed,
  createSizeChartFixedArithmetic,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { TextareaHTMLAttributes } from "react";
import { IZComponentHeight } from "../component/component-height.mjs";
import { ZLabeled } from "../label/labeled";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { IZText, useText } from "./text";

export interface IZTextArea
  extends IZText,
    Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      "prefix" | "type" | "value"
    >,
    IZComponentHeight<ZSizeFixed> {}

const TextAreaRows = createSizeChartFixedArithmetic(2, 2);

/**
 * Represents a text input that supports multiline.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZTextArea(props: IZTextArea) {
  const tailor = useFashionTailor();
  const {
    className,
    name,
    fashion,
    required,
    height,
    label,
    orientation,
    prefix,
    suffix,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onValueChange,
    ...attributes
  } = props;
  const InputProps = useText(props);
  const _height = new ZDeviceValues(height, ZSizeFixed.Medium);
  const rows = TextAreaRows[_height.xl];
  const { component, primary } = useFashionTheme();
  const _fashion = firstDefined(primary, fashion);
  const picker = new ZColorPicker(_fashion);

  const _className = css`
    textarea {
      background: transparent;
      border: none;
      color: inherit;
      width: 100%;
      outline: none;
      padding: 0;
      margin: 0;
      resize: none;
    }

    textarea:focus,
    textarea:focus-visible,
    textarea:focus-within {
      border: none;
    }

    .ZText-area[data-disabled="true"] {
      opacity: 0.35;
      pointer-events: none;
    }

    .ZText-area {
      align-items: flex-start;
      background-color: ${component.idle.main};
      border-radius: ${tailor.rounding(ZSizeFixed.ExtraSmall)};
      border-style: solid;
      border-width: ${tailor.thickness(ZSizeFixed.Medium)};
      display: flex;
      color: ${component.idle.contrast};
      gap: ${tailor.gap(ZSizeFixed.ExtraSmall)};
      outline: none;
      padding: ${tailor.gap(ZSizeFixed.ExtraSmall)};
    }

    .ZText-area:hover:not([data-disabled="true"]) {
      border-color: ${picker.hover.border};
    }

    .ZText-area:focus-within {
      border-color: ${picker.idle.border};
    }

    .ZText-area:active:not([data-disabled="true"]) {
      border-color: ${picker.active.border};
    }

    .ZText-prefix,
    .ZText-suffix {
      display: inline-flex;
    }
  `;

  return (
    <ZLabeled
      className={cssJoinDefined("ZText-root", _className, className)}
      label={label}
      LabelProps={{
        required,
        className: "ZText-label",
        htmlFor: InputProps.id,
      }}
      name={name}
      orientation={orientation}
    >
      <div className="ZText-area" data-disabled={InputProps.disabled}>
        {prefix && <div className="ZText-prefix">{prefix}</div>}
        <textarea
          {...attributes}
          {...InputProps}
          rows={rows}
          data-required={required}
        />
        {suffix && <div className="ZText-suffix">{suffix}</div>}
      </div>
    </ZLabeled>
  );
}
