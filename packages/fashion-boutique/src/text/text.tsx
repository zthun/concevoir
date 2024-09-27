import { ZCircusKeyboardQwerty } from "@zthun/cirque";
import { get, noop } from "lodash-es";
import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { IZComponentAdornment } from "../component/component-adornment.mjs";
import { IZComponentDisabled } from "../component/component-disabled.mjs";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentLabel } from "../component/component-label.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentOrientation } from "../component/component-orientation.mjs";
import { IZComponentRequired } from "../component/component-required.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentValue } from "../component/component-value.mjs";

/**
 * Represents an input for free form text
 */
export interface IZText
  extends IZComponentDisabled,
    IZComponentName,
    IZComponentFashion,
    IZComponentValue<string>,
    IZComponentLabel,
    IZComponentAdornment,
    IZComponentOrientation,
    IZComponentRequired,
    IZComponentStyle {
  readOnly?: boolean;
  placeholder?: string;
}

function onChange(
  current: string,
  value: string,
  onValueChange: (val: string) => void,
) {
  if (current !== value) {
    onValueChange(current);
  }
}

/**
 * Constructs a TextFieldProps object based on the props for an IZText component.
 *
 * @param props -
 *        The properties for the IZText component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function useText<T extends HTMLElement & { value: string }>(
  props: IZText,
) {
  const {
    name,
    disabled,
    value,
    required,
    placeholder,
    readOnly,
    onValueChange = noop,
  } = props;
  const [current, setCurrent] = useState(value || "");

  useEffect(() => {
    setCurrent(value || "");
  }, [value]);

  /*
  const renderAdornment = (adornment: ReactNode, position: "start" | "end") =>
    null;
  */

  return {
    disabled,
    value: current,
    name,
    required,
    placeholder: placeholder,
    readOnly,
    onBlur: () => onChange(current || "", value || "", onValueChange),
    onInput: (e: FormEvent<T>) => setCurrent(e.currentTarget.value),
  };
}

/**
 * Constructs a keyboard handler that commits the  value when the enter key is pressed.
 *
 * @param props -
 *        The text properties.
 * @param onKeyDown -
 *        A different key down handler that
 *
 * @returns
 *        A new function that handles the event key in addition to the
 *        other key handler.
 *
 */
export function withEnterCommit(
  props: IZText,
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => any = noop,
) {
  const { value, onValueChange = noop } = props;

  return (e: KeyboardEvent<HTMLElement>) => {
    onKeyDown(e);

    if (!e.defaultPrevented && e.code === ZCircusKeyboardQwerty.enter.code) {
      const current = get(e.target, "value", "");
      onChange(current || "", value || "", onValueChange);
    }
  };
}
