import { createGuid } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import { castArray, first, identity } from "lodash-es";
import { ReactNode, useMemo } from "react";
import { IZComponentDisabled } from "../component/component-disabled.mjs";
import { IZComponentLabel } from "../component/component-label.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentOrientation } from "../component/component-orientation.mjs";
import { IZComponentRequired } from "../component/component-required.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentValue } from "../component/component-value.mjs";

export interface IZChoiceOption<O = any, V = O> {
  key: string;
  value: V;
  option: O;
}

export interface IZChoice<O = any, V = O>
  extends IZComponentDisabled,
    IZComponentStyle,
    IZComponentValue<V[] | V | null>,
    IZComponentLabel,
    IZComponentRequired,
    IZComponentOrientation,
    IZComponentName {
  multiple?: boolean;
  indelible?: boolean;
  options?: Array<O>;

  identifier?: (option: O) => V;
  display?: (option: O) => string;
  renderOption?: (option: O) => ReactNode;
}

export interface IZChoiceApi<O, V> {
  readonly choices: IZChoiceOption<O, V>[];
  readonly lookup: Map<O | V | string, IZChoiceOption<O, V>>;
  readonly value: V[] | null;

  isValueSelected(value: V): boolean;
  display(option: O): string;
  render(option: O): ReactNode;
  setValue(value: V[] | null): void;
}

/**
 * Imports the common foundation for all choice components.
 *
 * @param props -
 *        The properties for a choice component.
 *
 * @returns
 *        The API to render a choice component.
 */
export function useChoice<O = any, V = O>(
  props: IZChoice<O, V>,
): IZChoiceApi<O, V> {
  const {
    value,
    onValueChange,
    options = [],
    identifier = identity as (option: O) => V,
    display = _display,
    multiple,
    renderOption = display,
  } = props;

  const _value: V[] | null = value == null ? null : castArray(value);
  const _onValueChange = (val: V[] | null) => {
    onValueChange?.call(null, cast(val, null));
  };
  const [__value, _setValue] = useAmbassadorState(
    value === undefined ? undefined : _value,
    _onValueChange,
    null,
  );
  const [choices, lookup] = useMemo(_choices, [options, identifier]);

  function _choices(): [
    IZChoiceOption<O, V>[],
    Map<O | V | string, IZChoiceOption<O, V>>,
  ] {
    const optionList = options.map<IZChoiceOption<O, V>>((op) => ({
      key: createGuid(),
      value: identifier(op),
      option: op,
    }));

    const lookup = new Map<O | V | string, IZChoiceOption<O, V>>();

    optionList.forEach((op) => {
      lookup.set(op.option, op);
      lookup.set(op.value, op);
      lookup.set(op.key, op);
    });

    return [optionList, lookup];
  }

  function _display(option: O) {
    return String(option);
  }

  function cast(value: V[] | undefined | null, fallback: any): V | V[] | null {
    const actual = value ?? [];
    const firstValue = first(actual) || fallback;
    return multiple ? actual : firstValue;
  }

  function isValueSelected(candidate: V) {
    return !!__value && __value.indexOf(candidate) >= 0;
  }

  return {
    choices,
    lookup,
    value: __value,

    display,
    render: renderOption,
    isValueSelected,
    setValue: _setValue,
  };
}
