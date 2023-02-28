import { Checkbox, FormControlLabel } from '@mui/material';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { useAmbassadorState } from '../state/use-ambassador-state';
import { IZBoolean } from './boolean';

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
  const { className, disabled, label, value, onValueChange, name } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange);
  const checked = _value == null ? false : _value;
  const indeterminate = _value === null;

  const control = (
    <Checkbox
      disabled={disabled}
      checked={checked}
      indeterminate={indeterminate}
      onChange={(_, checked) => _setValue(checked)}
      name={name}
    />
  );

  return (
    <FormControlLabel
      className={cssJoinDefined('ZBoolean-root', 'ZBoolean-checkbox', className)}
      control={control}
      name={name}
      data-name={name}
      label={label}
    />
  );
}
