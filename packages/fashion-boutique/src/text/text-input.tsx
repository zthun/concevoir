import { css } from "@emotion/css";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { ZLabeled } from "../label/labeled";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { IZText, useText, withEnterCommit } from "./text";

/**
 * Represents the type of text.
 */
export enum ZTextType {
  /**
   * Regular text that is not hidden
   *
   * This is the default.
   */
  Text = "text",

  /**
   * Password text where the value is never displayed.
   */
  Password = "password",
}

/**
 * Represents props for the text input.
 */
export interface IZTextInput extends IZText {
  /**
   * The optional type of text.
   */
  type?: ZTextType;
}

/**
 * Represents a free form text component that just displays an html input.
 *
 * @param props -
 *        The properties to the component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZTextInput(props: IZTextInput) {
  const {
    className,
    fashion,
    type = ZTextType.Text,
    name,
    label,
    required,
    orientation,
    prefix,
    suffix,
  } = props;
  const tailor = useFashionTailor();
  const InputProps = useText(props);
  const handleKeyDown = withEnterCommit(props);
  const { component, primary } = useFashionTheme();
  const _fashion = firstDefined(primary, fashion);
  const picker = new ZColorPicker(_fashion);

  const _className = css`
    input {
      background: transparent;
      border: none;
      color: inherit;
      width: 100%;
      height: 100%;
      outline: none;
      padding: 0;
      margin: 0;
    }

    input:focus,
    input:focus-visible,
    input:focus-within {
      border: none;
    }

    .ZText-input {
      align-items: center;
      background-color: ${component.idle.main};
      border-radius: ${tailor.rounding(ZSizeFixed.ExtraSmall)};
      border-style: solid;
      border-width: ${tailor.thickness(ZSizeFixed.Medium)};
      display: flex;
      color: ${component.idle.contrast};
      gap: ${tailor.gap(ZSizeFixed.ExtraSmall)};
      height: 2.5rem;
      outline: none;
      padding: 0 ${tailor.gap(ZSizeFixed.ExtraSmall)};
    }

    .ZText-input[data-disabled="true"] {
      opacity: 0.35;
      pointer-events: none;
    }

    .ZText-input:hover:not([data-disabled="true"]) {
      border-color: ${picker.hover.border};
    }

    .ZText-input:focus-within {
      border-color: ${picker.idle.border};
    }

    .ZText-input:active:not([data-disabled="true"]) {
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
      LabelProps={{ required, className: "ZText-label" }}
      orientation={orientation}
      name={name}
    >
      <div className="ZText-input" data-disabled={InputProps.disabled}>
        {prefix && <div className="ZText-prefix">{prefix}</div>}
        <input {...InputProps} type={type} onKeyDown={handleKeyDown} />
        {suffix && <div className="ZText-suffix">{suffix}</div>}
      </div>
    </ZLabeled>
  );
}
