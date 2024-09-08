import { OutlinedInput } from "@mui/material";
import {
  ZDeviceValues,
  ZSizeFixed,
  createSizeChartFixedArithmetic,
} from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { IZComponentHeight } from "../component/component-height.mjs";
import { ZLabeled } from "../label/labeled";
import { createStyleHook } from "../theme/styled";
import { IZText, useText } from "./text";

export interface IZTextArea extends IZText, IZComponentHeight<ZSizeFixed> {}

const TextAreaRows = createSizeChartFixedArithmetic(2, 2);

const useTextAreaStyles = createStyleHook(({ theme }) => ({
  input: {
    color: theme.surface.idle.contrast,
    backgroundColor: theme.surface.idle.main,
  },
}));

/**
 * Represents a text input that supports multiline.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZTextArea(props: IZTextArea) {
  const { className, name, required, height, label, orientation } = props;
  const InputProps = useText(props, "");
  const _height = new ZDeviceValues(height, ZSizeFixed.Medium);
  const rows = TextAreaRows[_height.xl];
  const { classes } = useTextAreaStyles();

  return (
    <ZLabeled
      className={cssJoinDefined("ZText-root", "ZText-area", className)}
      label={label}
      LabelProps={{ required, className: "ZText-label" }}
      name={name}
      orientation={orientation}
    >
      <OutlinedInput
        {...InputProps}
        className={cssJoinDefined("ZText-area", classes.input)}
        multiline
        rows={rows}
        data-required={required}
      />
    </ZLabeled>
  );
}
