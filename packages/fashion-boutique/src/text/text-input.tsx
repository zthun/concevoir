import { OutlinedInput } from '@mui/material';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import React from 'react';
import { ZLabeled } from '../label/labeled';
import { createStyleHook } from '../theme/styled';
import { IZText, useText, withEnterCommit } from './text';

/**
 * Represents the type of text.
 */
export enum ZTextType {
  /**
   * Regular text that is not hidden
   *
   * This is the default.
   */
  Text = 'text',

  /**
   * Password text where the value is never displayed.
   */
  Password = 'password'
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
    color: theme.surface.contrast,
    backgroundColor: firstDefined(theme.surface.main, theme.surface.light)
  }
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
  const { className, type = ZTextType.Text, name, label, required } = props;
  const InputProps = useText(props, '');
  const handleKeyDown = withEnterCommit(props);
  const { classes } = useTextInputStyles();

  return (
    <ZLabeled
      className={cssJoinDefined('ZText-root', className)}
      LabelProps={{ label, required, className: 'ZText-label' }}
      name={name}
    >
      {(id) => (
        <OutlinedInput
          {...InputProps}
          type={type}
          className={cssJoinDefined('ZText-input', classes.input)}
          onKeyDown={handleKeyDown}
          aria-labelledby={id}
        />
      )}
    </ZLabeled>
  );
}
