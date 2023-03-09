import { FormControlLabel, Switch } from '@mui/material';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ChangeEvent } from 'react';
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
export function ZBooleanSwitch(props: IZBoolean<boolean>) {
  const { className, disabled, label, value, onValueChange, name } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange);
  const checked = !!_value;

  const handleChange = (_: ChangeEvent, checked: boolean) => {
    _setValue(checked);
  };

  const control = <Switch disabled={disabled} checked={checked} onChange={handleChange} name={name} />;

  return (
    <FormControlLabel
      className={cssJoinDefined('ZBoolean-root', 'ZBoolean-switch', className)}
      control={control}
      label={label}
      name={name}
      data-name={name}
    />
  );
}
