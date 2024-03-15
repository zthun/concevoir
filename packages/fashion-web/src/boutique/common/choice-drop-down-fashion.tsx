import { IZComponentName } from '@zthun/fashion-boutique';
import { IZComponentValue, ZChoiceDropDown } from '@zthun/fashion-react';
import { ZFashionArea, ZFashionContrast, ZFashionName, ZFashionPriority, ZFashionSeverity } from '@zthun/fashion-theme';
import { setFirst } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import { identity, startCase } from 'lodash-es';
import React, { useMemo } from 'react';

export interface IZChoiceDropDownFashion extends IZComponentValue<ZFashionName>, IZComponentName {}

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
  const fashion = useMemo(() => (_value ? [_value] : undefined), [_value]);
  const _setFashion = setFirst.bind(null, _setValue, undefined);
  const designs = [
    ...Object.values(ZFashionPriority),
    ...Object.values(ZFashionSeverity),
    ...Object.values(ZFashionArea),
    ...Object.values(ZFashionContrast)
  ];

  return (
    <ZChoiceDropDown
      label='Fashion'
      value={fashion}
      onValueChange={_setFashion}
      options={designs}
      renderOption={startCase}
      identifier={identity}
      name={name}
    />
  );
}
