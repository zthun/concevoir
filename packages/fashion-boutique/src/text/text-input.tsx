import { OutlinedInput } from "@mui/material";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { ZLabeled } from "../label/labeled";
import { createStyleHook } from "../theme/styled";
import { IZText, useText, withEnterCommit } from "./text";

/**
 * Represents the type of text.
 */
export enum ZTextType {
  /**
   * Regular text that is not hidden
   *
   * This is the default.
   */
  Text = "text",

  /**
   * Password text where the value is never displayed.
   */
  Password = "password",
}

/**
 * Represents props for the text input.
 */
export interface IZTextInput extends IZText<string> {
  /**
   * The optional type of text.
   */
  type?: ZTextType;
}

const useTextInputStyles = createStyleHook(({ theme }) => ({
  input: {
    color: theme.surface.idle.contrast,
    backgroundColor: theme.surface.idle.main,
  },
}));

/**
 * Represents a free form text component that just displays an html input.
 *
 * @param props -
 *        The properties to the component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZTextInput(props: IZTextInput) {
  const {
    className,
    type = ZTextType.Text,
    name,
    label,
    required,
    orientation,
  } = props;
  const InputProps = useText(props, "");
  const handleKeyDown = withEnterCommit(props);
  const { classes } = useTextInputStyles();

  return (
    <ZLabeled
      className={cssJoinDefined("ZText-root", className)}
      label={label}
      LabelProps={{ required, className: "ZText-label" }}
      orientation={orientation}
      name={name}
    >
      <OutlinedInput
        {...InputProps}
        type={type}
        className={cssJoinDefined("ZText-input", classes.input)}
        onKeyDown={handleKeyDown}
      />
    </ZLabeled>
  );
}
