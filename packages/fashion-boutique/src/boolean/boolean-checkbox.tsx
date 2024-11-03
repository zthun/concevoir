import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import {
  css,
  cssJoinDefined,
  pickDataAttributes,
  ZOrientation,
} from "@zthun/helpful-fn";
import { useAmbassadorState, useKeyboardActivate } from "@zthun/helpful-react";
import { ChangeEvent, useId, useMemo, useRef } from "react";
import { ZIconFontAwesome } from "../icon/icon-font-awesome";
import { ZLabeled } from "../label/labeled";
import { useFashionTheme } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled";
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
export function ZBooleanCheckbox(props: IZBoolean<boolean | null>) {
  const { primary } = useFashionTheme();
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
  const { component } = useFashionTheme();
  const _fashion = useMemo(() => new ZColorPicker(fashion), [fashion]);
  const id = useId();
  const input = useRef<HTMLDivElement>(null);

  const [_value, _setValue] = useAmbassadorState(value, onValueChange, false);
  const checked = _value === null ? true : _value;
  const indeterminate = _value === null;

  const _className = useCss(css`
    &,
    & .ZLabel-root {
      cursor: pointer;
    }

    &[data-disabled="true"],
    &[data-disabled="true"] .ZLabel-root {
      cursor: default;
      opacity: 0.65;
    }

    input {
      display: none;
    }

    .ZBoolean-value {
      background-color: ${component.idle.main};
      color: ${component.idle.contrast};
      display: inline-flex;
      justify-content: center;
      width: 1rem;
      height: 1rem;
    }

    input:checked + .ZBoolean-value {
      background-color: ${_fashion.idle.main};
      color: ${_fashion.idle.contrast};
      text-align: center;
    }

    &:hover:not([data-disabled="true"]) .ZBoolean-value,
    &:hover:not([data-disabled="true"]) input:checked + .ZBoolean-value {
      background-color: ${_fashion.hover.main};
      color: ${_fashion.hover.contrast};
    }

    &:focus-within .ZBoolean-value {
      background-color: ${_fashion.focus.main} !important;
      color: ${_fashion.focus.contrast} !important;
      outline: none;
      box-shadow: 0 0 0.25rem 0.25rem ${_fashion.focus.border};
    }
  `);

  const handleChecked = (checked: boolean) => {
    if (indeterminate) {
      _setValue(true);
    } else {
      _setValue(checked);
    }
  };

  const handleToggle = () => {
    if (!disabled) {
      handleChecked(!checked);
    }
  };

  const { tabIndex, onKey } = useKeyboardActivate(handleToggle);

  const renderCheckState = () => {
    if (indeterminate) {
      return <ZIconFontAwesome name="minus" width={ZSizeFixed.ExtraSmall} />;
    }

    return checked ? (
      <ZIconFontAwesome name="check" width={ZSizeFixed.ExtraSmall} />
    ) : null;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    handleChecked(e.currentTarget.checked);

  const focusInput = async () => input.current?.focus();

  return (
    <ZLabeled
      {...pickDataAttributes(props)}
      className={cssJoinDefined(
        "ZBoolean-root",
        "ZBoolean-checkbox",
        _className,
        className,
      )}
      label={label}
      orientation={ZOrientation.Horizontal}
      position="suffix"
      LabelProps={{ required, htmlFor: id }}
      name={name}
      data-disabled={disabled}
      data-fashion={fashion?.name}
      onClick={focusInput}
      aria-disabled={disabled}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleInputChange}
        name={name}
        data-indeterminate={indeterminate}
      />
      <div
        className="ZBoolean-value"
        onClick={handleToggle}
        onKeyDown={onKey}
        tabIndex={tabIndex}
        ref={input}
      >
        {renderCheckState()}
      </div>
    </ZLabeled>
  );
}
