import { FormControlLabel, Switch } from '@mui/material';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ChangeEvent } from 'react';
import { useAmbassadorState } from '../state/use-ambassador-state';
import { useFashionTheme } from '../theme/fashion';
import { createStyleHook } from '../theme/styled';
import { IZBoolean } from './boolean';

const useBooleanSwitchStyles = createStyleHook(({ theme }, props: IZBoolean<boolean>) => {
  const { fashion = theme.primary, value } = props;
  const track = value ? fashion.main : undefined;

  return {
    switch: {
      '.Mui-checked': {
        '.MuiSwitch-thumb ': {
          color: fashion.main
        }
      },
      '.MuiSwitch-track': {
        backgroundColor: `${track} !important`
      }
    }
  };
});

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
  const theme = useFashionTheme();
  const { className, disabled, label, value, onValueChange, name, fashion = theme.primary } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange);
  const checked = !!_value;
  const { classes } = useBooleanSwitchStyles(props);

  const handleChange = (_: ChangeEvent, checked: boolean) => {
    _setValue(checked);
  };

  const control = (
    <Switch className={classes.switch} disabled={disabled} checked={checked} onChange={handleChange} name={name} />
  );

  return (
    <FormControlLabel
      className={cssJoinDefined('ZBoolean-root', 'ZBoolean-switch', className)}
      control={control}
      label={label}
      name={name}
      data-name={name}
      data-fashion={fashion.name}
    />
  );
}
