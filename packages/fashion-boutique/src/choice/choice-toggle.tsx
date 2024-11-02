import { css } from "@emotion/css";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { ZLabeled } from "../label/labeled";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { IZChoice, IZChoiceOption, useChoice } from "./choice";

export function ZChoiceToggle<O, V>(props: IZChoice<O, V>) {
  const {
    className,
    label,
    disabled,
    multiple,
    name,
    indelible,
    orientation,
    required,
  } = props;
  const {
    choices,
    value,
    display,
    render,
    setValue,
    isValueSelected,
    toggleValue,
  } = useChoice(props);
  const { component, primary, error } = useFashionTheme();
  const tailor = useFashionTailor();
  const picker = new ZColorPicker(primary);

  const _className = css`
    .ZChoice-options {
      align-items: stretch;
      display: flex;
      flex-wrap: nowrap;
    }

    .ZChoice-option {
      color: ${component.idle.contrast};
      cursor: pointer;
      background-color: ${component.idle.main};
      border-style: solid;
      border-width: ${tailor.thickness(ZSizeFixed.ExtraSmall)};
      padding: ${tailor.gap(ZSizeFixed.Small)};
    }

    .ZChoice-option:first-child {
      border-top-left-radius: ${tailor.rounding(ZSizeFixed.ExtraSmall)};
      border-bottom-left-radius: ${tailor.rounding(ZSizeFixed.ExtraSmall)};
    }

    .ZChoice-option:last-child {
      border-top-right-radius: ${tailor.rounding(ZSizeFixed.ExtraSmall)};
      border-bottom-right-radius: ${tailor.rounding(ZSizeFixed.ExtraSmall)};
    }

    .ZChoice-value {
      background-color: ${picker.idle.main};
      color: ${picker.idle.contrast};
    }

    .ZChoice-option:hover,
    .ZChoice-value:hover {
      background-color: ${picker.hover.main};
      color: ${picker.hover.contrast};
    }

    .ZChoice-clear {
      padding: ${tailor.gap(ZSizeFixed.Small)}
        ${tailor.gap(ZSizeFixed.ExtraSmall)};
    }

    .ZChoice-clear:hover {
      background-color: ${error.idle.main};
      color: ${error.idle.contrast};
    }

    .ZChoice-option:disabled,
    .ZChoice-clear:disabled {
      opacity: 0.35;
      pointer-events: none;
    }
  `;

  const renderClear = () => {
    if (indelible || !value?.length) {
      return null;
    }

    return (
      <button
        className={cssJoinDefined("ZChoice-option", "ZChoice-clear")}
        disabled={disabled}
        onClick={setValue.bind(null, [])}
      >
        X
      </button>
    );
  };

  const renderChoice = (choice: IZChoiceOption<O, V>) => {
    const _value = choice.value as any;
    const _display = display(choice.option);
    const selected = isValueSelected(choice.value);

    const className = cssJoinDefined(
      "ZChoice-option",
      ["ZChoice-value", selected],
      ["ZChoice-remove", !!multiple && selected],
    );

    return (
      <button
        key={choice.key}
        disabled={disabled}
        className={className}
        onClick={() => toggleValue(_value)}
        data-value={choice.value}
      >
        <span title={_display}>{render(choice.option)}</span>
      </button>
    );
  };

  return (
    <ZLabeled
      className={cssJoinDefined(
        "ZChoice-root",
        "ZChoice-toggle",
        "ZChoice-always-open",
        _className,
        className,
      )}
      label={label}
      LabelProps={{ required, className: "ZChoice-label" }}
      name={name}
      orientation={orientation}
    >
      <div className="ZChoice-options">
        {choices.map(renderChoice)}
        {renderClear()}
      </div>
    </ZLabeled>
  );
}
