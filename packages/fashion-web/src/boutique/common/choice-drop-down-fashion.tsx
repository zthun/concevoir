import { IZComponentName, IZComponentValue, useFashionTheme, ZChoiceDropDown } from '@zthun/fashion-boutique';
import { IZFashion } from '@zthun/fashion-theme';
import { setFirst } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import { identity } from 'lodash';
import React, { useMemo } from 'react';

export interface IZChoiceDropDownFashion extends IZComponentValue<IZFashion>, IZComponentName {}

/**
 * A drop down that allows the user to select a fashion from the theme.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The jsx to render the component.
 */
export function ZChoiceDropDownFashion(props: IZChoiceDropDownFashion) {
  const { value, onValueChange, name } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange);
  const { primary, secondary, success, warning, error, info, light, dark, body, surface } = useFashionTheme();
  const fashion = useMemo(() => (_value ? [_value] : undefined), [_value]);
  const _setFashion = setFirst.bind(null, _setValue, undefined);
  const designs = [primary, secondary, success, warning, error, info, light, dark, body, surface];

  return (
    <ZChoiceDropDown
      label='Fashion'
      value={fashion}
      onValueChange={_setFashion}
      options={designs}
      renderOption={(f) => f.name}
      identifier={identity}
      name={name}
    />
  );
}
