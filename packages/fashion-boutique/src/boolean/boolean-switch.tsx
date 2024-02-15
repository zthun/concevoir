import { FormControlLabel, Switch } from '@mui/material';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import React, { ChangeEvent } from 'react';
import { useFashionTheme } from '../theme/fashion';
import { createStyleHook } from '../theme/styled';
import { IZBoolean } from './boolean';

const useBooleanSwitchStyles = createStyleHook(({ theme }, props: IZBoolean<boolean>) => {
  const { fashion = theme.primary, value } = props;
  const track = value ? fashion.main : undefined;

  return {
    root: {
      'whiteSpace': 'nowrap',

      '.MuiFormControlLabel-asterisk': {
        color: theme.error.main
      }
    },

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
  const { className, disabled, label, value, onValueChange, name, fashion = theme.primary, required } = props;
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
      className={cssJoinDefined('ZBoolean-root', 'ZBoolean-switch', className, classes.root)}
      control={control}
      label={label}
      name={name}
      required={required}
      data-name={name}
      data-fashion={fashion.name}
    />
  );
}
