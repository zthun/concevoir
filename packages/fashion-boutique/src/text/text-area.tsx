import { OutlinedInput } from '@mui/material';
import { ZSizeFixed, createSizeChartFixedArithmetic } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentHeight } from '../component/component-height';
import { ZLabeled } from '../label/labeled';
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
  const { className, name, required, height = ZSizeFixed.Medium, label } = props;
  const InputProps = useText(props, '');
  const rows = TextAreaRows[height];

  return (
    <ZLabeled
      className={cssJoinDefined('ZText-root', 'ZText-area', className)}
      LabelProps={{ label, required, className: 'ZText-label' }}
      name={name}
    >
      {(id) => (
        <OutlinedInput
          {...InputProps}
          aria-labelledby={id}
          className='ZText-area'
          multiline
          rows={rows}
          data-required={required}
        />
      )}
    </ZLabeled>
  );
}
