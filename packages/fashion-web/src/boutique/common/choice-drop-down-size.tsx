import {
  IZComponentName,
  IZComponentValue,
  ZChoiceDropDown,
} from "@zthun/fashion-boutique";
import {
  ZSize,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
} from "@zthun/fashion-tailor";
import { setFirst } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import { identity, startCase } from "lodash-es";
import { ReactNode, useMemo } from "react";

export const ZFixedSizes = Object.values(ZSizeFixed);
export const ZVariedSizes = Object.values(ZSizeVaried);
export const ZVoidSizes = Object.values(ZSizeVoid);

export interface IZChoiceDropDownSize<TSize>
  extends IZComponentValue<TSize>,
    IZComponentName {
  label: ReactNode;
  sizes: TSize[];
}

/**
 * A drop down that allows the user to select a fashion from the theme.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The jsx to render the component.
 */
export function ZChoiceDropDownSize<TSize = ZSize>(
  props: IZChoiceDropDownSize<TSize>,
) {
  const { value, onValueChange, name, sizes, label } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange);
  const size = useMemo(() => (_value ? [_value] : undefined), [_value]);
  const _setSize = setFirst.bind(null, _setValue, undefined);

  return (
    <ZChoiceDropDown
      label={label}
      value={size}
      onValueChange={_setSize}
      options={sizes}
      renderOption={(s) => startCase(String(s))}
      identifier={identity}
      name={name}
    />
  );
}
