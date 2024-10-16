import { css } from "@emotion/css";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import { useAmbassadorState, useKeyboardActivate } from "@zthun/helpful-react";
import { ChangeEvent, useId, useMemo, useRef } from "react";
import { ZLabeled } from "../label/labeled";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { IZBoolean } from "./boolean";

/**
 * A boolean component that can be checked, unchecked, or indeterminate
 *
 * @param props -
 *        The properties for this boolean component.
 *
 * @returns
 *        The JSX to render the checkbox
 */
export function ZBooleanSwitch(props: IZBoolean<boolean>) {
  const { component, primary } = useFashionTheme();
  const {
    className,
    disabled,
    label,
    value,
    onValueChange,
    name,
    fashion = primary,
    required,
  } = props;
  const tailor = useFashionTailor();
  const input = useRef<HTMLSpanElement>(null);
  const [_value, _setValue] = useAmbassadorState(value, onValueChange);
  const _fashion = useMemo(() => new ZColorPicker(fashion), [fashion]);
  const checked = !!_value;
  const id = useId();

  const switchWidth = "1.25rem";
  const sliderWidth = "2rem";
  const sliderHeight = "0.75rem";

  const _className = css`
    & .ZLabel-root {
      cursor: pointer;
    }

    & .ZBoolean-toggler {
      position: relative;
      display: inline-block;
      width: ${sliderWidth};
      height: ${sliderHeight};
      margin: calc(${switchWidth} / 4) 0;
    }

    input {
      display: none;
    }

    .ZBoolean-value {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background-color: ${component.idle.main};
      transition: 0.4s;
      border-radius: ${tailor.rounding(ZSizeFixed.Medium)};
    }

    .ZBoolean-value:before {
      position: absolute;
      content: "";
      height: ${switchWidth};
      width: ${switchWidth};
      background-color: ${component.idle.contrast};
      transition: 0.4s;
      border-radius: ${tailor.rounding(ZSizeVaried.Full)};
      bottom: calc(${sliderHeight} / 2 - ${switchWidth} / 2);
    }

    input:checked + .ZBoolean-value {
      background-color: ${_fashion.idle.main};
    }

    input:checked + .ZBoolean-value:before {
      transform: translateX(calc(${sliderWidth} / 2));
    }

    &:focus-within .ZBoolean-value {
      outline: none;
    }

    &:focus-within .ZBoolean-value::before {
      background-color: ${_fashion.focus.main};
      box-shadow: 0 0 0.25rem 0.25rem ${_fashion.focus.border};
    }
  `;

  const handleToggle = () => {
    if (!disabled) {
      _setValue(!checked);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    _setValue(e.currentTarget.checked);

  const { tabIndex, onKey } = useKeyboardActivate(handleToggle);

  const focusInput = async () => input.current?.focus();

  return (
    <ZLabeled
      className={cssJoinDefined(
        "ZBoolean-root",
        "ZBoolean-switch",
        _className,
        className,
      )}
      label={label}
      name={name}
      LabelProps={{ required, htmlFor: id }}
      orientation={ZOrientation.Horizontal}
      position="suffix"
      data-fashion={fashion.name}
      onClick={focusInput}
    >
      <div className="ZBoolean-toggler">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleInputChange}
          name={name}
        />
        <span
          className="ZBoolean-value"
          tabIndex={tabIndex}
          onKeyDown={onKey}
          onClick={handleToggle}
          ref={input}
        />
      </div>
    </ZLabeled>
  );
}
