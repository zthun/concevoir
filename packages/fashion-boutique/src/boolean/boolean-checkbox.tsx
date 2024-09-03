import { Checkbox, FormControlLabel } from "@mui/material";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import React from "react";
import { useFashionTheme } from "../theme/fashion.mjs";
import { createStyleHook } from "../theme/styled";
import { IZBoolean } from "./boolean";

const useBooleanCheckboxStyles = createStyleHook(
  ({ theme }, props: IZBoolean<boolean | null>) => {
    const { fashion = theme.primary } = props;
    const svg = { color: fashion.idle.main };

    return {
      root: {
        whiteSpace: "nowrap",

        ".MuiFormControlLabel-asterisk": {
          color: theme.error.idle.main,
        },
      },
      checkbox: {
        "&.Mui-checked": { svg },
        "&.MuiCheckbox-indeterminate": { svg },
      },
    };
  },
);

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
  const { primary } = useFashionTheme();
  const {
    className,
    disabled,
    label,
    value,
    onValueChange,
    name,
    fashion = primary,
    required,
  } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange);
  const checked = _value == null ? false : _value;
  const indeterminate = _value === null;
  const { classes } = useBooleanCheckboxStyles(props);

  const control = (
    <Checkbox
      className={classes.checkbox}
      disabled={disabled}
      checked={checked}
      indeterminate={indeterminate}
      onChange={(_, checked) => _setValue(checked)}
      name={name}
    />
  );

  return (
    <FormControlLabel
      className={cssJoinDefined(
        "ZBoolean-root",
        "ZBoolean-checkbox",
        className,
        classes.root,
      )}
      control={control}
      name={name}
      required={required}
      data-name={name}
      data-fashion={fashion.name}
      label={label}
    />
  );
}
