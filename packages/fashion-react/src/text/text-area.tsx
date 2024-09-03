import { OutlinedInput } from "@mui/material";
import { IZComponentHeight } from "@zthun/fashion-boutique";
import {
  ZSizeFixed,
  castDeviceMap,
  createSizeChartFixedArithmetic,
} from "@zthun/fashion-tailor";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import React from "react";
import { ZLabeled } from "../label/labeled";
import { createStyleHook } from "../theme/styled";
import { IZText, useText } from "./text";

export interface IZTextArea
  extends IZText,
    Pick<IZComponentHeight<ZSizeFixed>, "height"> {}

const TextAreaRows = createSizeChartFixedArithmetic(2, 2);

const useTextAreaStyles = createStyleHook(({ theme }) => ({
  input: {
    color: theme.surface.contrast,
    backgroundColor: firstDefined(theme.surface.main, theme.surface.light),
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
  const rows = TextAreaRows[castDeviceMap(height, ZSizeFixed.Medium).xl];
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
