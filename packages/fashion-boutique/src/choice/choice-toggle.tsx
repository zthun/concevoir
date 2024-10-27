import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { ZOrientation, cssJoinDefined } from "@zthun/helpful-fn";
import { ZLabeled } from "../label/labeled";
import { ZStack } from "../stack/stack";
import { createStyleHook } from "../theme/styled";
import { IZChoice, IZChoiceOption, useChoice } from "./choice";

const useToggleStyles = createStyleHook(({ theme }) => ({
  toggle: {
    color: theme.surface.idle.contrast,
    backgroundColor: theme.surface.idle.main,

    "&:hover": {
      backgroundColor: theme.primary.hover?.main,
      color: theme.primary.hover?.contrast,
    },

    "&.ZChoice-value": {
      backgroundColor: theme.primary.idle.main,
      color: theme.primary.idle.contrast,

      "&:hover": {
        backgroundColor: theme.primary.hover?.main,
        color: theme.primary.hover?.main,
      },
    },

    "&.ZChoice-clear": {
      "&:hover": {
        backgroundColor: theme.error.idle.main,
        color: theme.error.idle.contrast,
      },
    },
  },
}));

/**
 * Represents a type of choice component that switches between a toggled button group.
 */
export function ZChoiceToggle<O, V>(props: IZChoice<O, V>) {
  const {
    className,
    label,
    disabled,
    multiple,
    name,
    indelible,
    orientation,
    required,
  } = props;
  const { choices, value, display, render, setValue, isValueSelected } =
    useChoice(props);
  const { classes } = useToggleStyles();

  const toggleValue = (_: any, v: V) => {
    const selected = isValueSelected(v);

    if (indelible && !multiple && selected) {
      return;
    }

    let next: V[] = value || [];

    if (selected) {
      next = next.filter((current) => current !== v);
    } else {
      next = multiple ? [...next, v] : [v];
    }

    setValue(next);
  };

  const renderClear = () => {
    if (indelible || !value?.length) {
      return null;
    }

    return (
      <ToggleButton
        className={cssJoinDefined("ZChoice-clear", classes.toggle)}
        onClick={setValue.bind(null, [])}
        value={[]}
      >
        X
      </ToggleButton>
    );
  };

  const renderChoice = (choice: IZChoiceOption<O, V>) => {
    const _value = choice.value as any;
    const _display = display(choice.option);
    const selected = isValueSelected(choice.value);

    const className = cssJoinDefined("ZChoice-option", classes.toggle, [
      "ZChoice-value",
      selected,
    ]);

    return (
      <ToggleButton
        key={choice.key}
        disabled={disabled}
        className={className}
        value={_value}
        selected={selected}
        onClick={toggleValue}
        data-value={choice.value}
      >
        <Tooltip title={_display}>
          <span>{render(choice.option)}</span>
        </Tooltip>
      </ToggleButton>
    );
  };

  return (
    <ZLabeled
      className={cssJoinDefined(
        "ZChoice-root",
        "ZChoice-toggle",
        "ZChoice-always-open",
        className,
      )}
      label={label}
      LabelProps={{ required, className: "ZChoice-label" }}
      name={name}
      orientation={orientation}
    >
      <ZStack orientation={ZOrientation.Horizontal}>
        <ToggleButtonGroup
          disabled={disabled}
          exclusive={!multiple}
          className="ZChoice-options"
        >
          {choices.map(renderChoice)}
          {renderClear()}
        </ToggleButtonGroup>
      </ZStack>
    </ZLabeled>
  );
}
