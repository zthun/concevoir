import { TextField } from '@mui/material';
import { createSizeChartFixedArithmetic, ZSizeFixed } from '@zthun/fashion-designer';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentHeight } from '../component/component-height';
import { IZText, useText } from './text';

export interface IZTextArea extends IZText, IZComponentHeight<ZSizeFixed> {}

const TextAreaRows = createSizeChartFixedArithmetic(2, 2);

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
  const { className, name, required, height = ZSizeFixed.Medium } = props;
  const _textField = useText(props, '');
  const rows = TextAreaRows[height];

  return (
    <TextField
      {..._textField}
      className={cssJoinDefined('ZText-root', 'ZText-area', className)}
      multiline
      rows={rows}
      data-name={name}
      data-required={required}
    />
  );
}
