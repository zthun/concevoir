import { OutlinedInput } from '@mui/material';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { ZLabeled } from '../label/labeled';
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
          className='ZText-input'
          onKeyDown={handleKeyDown}
          aria-labelledby={id}
        />
      )}
    </ZLabeled>
  );
}
