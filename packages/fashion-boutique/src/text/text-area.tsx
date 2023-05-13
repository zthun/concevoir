import { OutlinedInput } from '@mui/material';
import { ZSizeFixed, createSizeChartFixedArithmetic } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentHeight } from '../component/component-height';
import { ZLabeled } from '../label/labeled';
import { createStyleHook } from '../theme/styled';
import { IZText, useText } from './text';

export interface IZTextArea extends IZText, IZComponentHeight<ZSizeFixed> {}

const TextAreaRows = createSizeChartFixedArithmetic(2, 2);

const useTextAreaStyles = createStyleHook(({ theme }) => ({
  input: {
    color: theme.surface.contrast,
    backgroundColor: firstDefined(theme.surface.main, theme.surface.light)
  }
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
  const { className, name, required, height = ZSizeFixed.Medium, label, orientation } = props;
  const InputProps = useText(props, '');
  const rows = TextAreaRows[height];
  const { classes } = useTextAreaStyles();

  return (
    <ZLabeled
      className={cssJoinDefined('ZText-root', 'ZText-area', className)}
      LabelProps={{ label, required, className: 'ZText-label' }}
      name={name}
      orientation={orientation}
    >
      {(id) => (
        <OutlinedInput
          {...InputProps}
          aria-labelledby={id}
          className={cssJoinDefined('ZText-area', classes.input)}
          multiline
          rows={rows}
          data-required={required}
        />
      )}
    </ZLabeled>
  );
}
