import { createGuid, firstDefined } from "@zthun/helpful-fn";
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
  readonly value: V[];

  isValueSelected(value: V): boolean;
  display(option: O): string;
  render(option: O): ReactNode;
  setValue(value: V[]): void;
  toggleValue(value: V): void;
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
    indelible,
    renderOption = display,
  } = props;

  const _value: V[] | undefined =
    value === undefined ? undefined : castArray(firstDefined([], value));

  const _onValueChange = (val: V[]) => {
    if (!val.length) {
      onValueChange?.call(null, null);
    }

    if (multiple) {
      onValueChange?.call(null, val);
    }

    onValueChange?.call(null, first(val)!);
  };

  const [__value, _setValue] = useAmbassadorState(_value, _onValueChange, []);

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

  function isValueSelected(candidate: V) {
    return !!__value && __value.indexOf(candidate) >= 0;
  }

  function toggleValue(candidate: V) {
    const selected = isValueSelected(candidate);

    if (indelible && !multiple && selected) {
      return;
    }

    let next: V[] = firstDefined([], __value);

    if (selected) {
      next = next.filter((current) => current !== candidate);
    } else {
      next = multiple ? [...next, candidate] : [candidate];
    }

    _setValue(next);
  }

  return {
    choices,
    lookup,
    value: __value,

    display,
    render: renderOption,
    isValueSelected,
    toggleValue,
    setValue: _setValue,
  };
}
