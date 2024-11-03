import { ZCircusKeyboardQwerty } from "@zthun/cirque";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import { KeyboardEvent } from "react";
import { ZIconFontAwesome } from "../icon/icon-font-awesome";
import { ZLabeled } from "../label/labeled";
import { ZTextInput } from "../text/text-input";
import { useCss } from "../theme/styled";
import { IZNumber } from "./number";

/**
 * Represents an input that takes a number value.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The JSX responsible for rendering this input.
 */
export function ZNumberInput(props: IZNumber<number | null>) {
  const {
    className,
    step = 1,
    min = -Infinity,
    max = Infinity,
    name,
    value,
    label,
    required,
    fashion,
    onValueChange,
  } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange, null);
  const __value = _value != null ? String(_value) : "";

  const _className = useCss(css`
    .ZNumber-spinner button {
      width: 1rem;
      height: 1rem;
      padding: 0;
      margin: 0;
      font-size: inherit;
      border: 0;
      display: flex;
      flex-direction: column;
    }

    svg: {
      width: 100%;
      height: 100%;
    }

    .ZNumber-spinner-chevron {
      display: inline-flex;
    }

    .ZNumber-spinner-increment {
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      justify-self: flex-start;
    }

    .ZNumber-spinner-decrement {
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      justify-self: flex-end;
    }
  `);

  const handleCommit = (update: string) => {
    _setValue(update?.trim() === "" ? null : +update);
  };

  const handleSpin = (direction: 1 | -1) => {
    let current = Number.isNaN(_value) ? 0 : _value;
    current = current || 0;
    let next = current + direction * step;
    next = Math.max(next, min);
    next = Math.min(next, max);
    _setValue(next);
  };

  const handleSpinOnEnter = (
    direction: 1 | -1,
    e: KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (e.code === ZCircusKeyboardQwerty.enter.code) {
      e.stopPropagation();
    }
  };

  const adornment = (
    <div className={cssJoinDefined("ZNumber-spinner")}>
      <button
        className={cssJoinDefined("ZNumber-spinner-increment")}
        onClick={handleSpin.bind(null, 1)}
        onKeyDown={handleSpinOnEnter.bind(null, 1)}
      >
        <ZIconFontAwesome
          className="ZNumber-spinner-chevron"
          name="chevron-up"
          width={ZSizeFixed.ExtraSmall}
        />
      </button>
      <button
        className={cssJoinDefined("ZNumber-spinner-decrement")}
        onClick={handleSpin.bind(null, -1)}
        onKeyDown={handleSpinOnEnter.bind(null, -1)}
      >
        <ZIconFontAwesome
          className="ZNumber-spinner-chevron"
          name="chevron-down"
          width={ZSizeFixed.ExtraSmall}
        />
      </button>
    </div>
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === ZCircusKeyboardQwerty.upArrow.code) {
      e.preventDefault();
      handleSpin(1);
    }

    if (e.code === ZCircusKeyboardQwerty.downArrow.code) {
      e.preventDefault();
      handleSpin(-1);
    }
  };

  return (
    <ZLabeled
      className={cssJoinDefined("ZNumber-root", _className, className)}
      label={label}
      LabelProps={{ required, className: "ZNumber-label" }}
      name={name}
    >
      <ZTextInput
        className={cssJoinDefined("ZNumber-input")}
        fashion={fashion}
        min={min}
        max={max}
        step={step}
        onKeyDown={handleKeyDown}
        value={__value}
        onValueChange={handleCommit}
        suffix={adornment}
      />
    </ZLabeled>
  );
}
