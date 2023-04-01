import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { ZStack } from 'src/stack/stack';
import { IZChoice, IZChoiceOption, useChoice } from './choice';

/**
 * Represents a type of choice component that switches between a toggled button group.
 */
export function ZChoiceToggle<O, V>(props: IZChoice<O, V>) {
  const { className, label, disabled, multiple, name, indelible } = props;
  const { choices, value, display, render, setValue } = useChoice(props);

  const isValueSelected = (option: V, value: V[] | undefined) => {
    return !!value && value.indexOf(option) >= 0;
  };

  const toggleValue = (_, v: V) => {
    const selected = isValueSelected(v, value);

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

  const renderChoice = (choice: IZChoiceOption<O, V>) => {
    const _value = choice.value as any;
    const _display = display(choice.option);
    const selected = isValueSelected(choice.value, value);

    return (
      <ToggleButton
        key={choice.key}
        disabled={disabled}
        className={cssJoinDefined('ZChoice-option', ['ZChoice-value', selected])}
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
    <ZStack
      orientation='vertical'
      className={cssJoinDefined('ZChoice-root', 'ZChoice-toggle', 'ZChoice-always-open', className)}
      alignItems='left'
      gap={ZSizeFixed.ExtraSmall}
    >
      <Tooltip title={label} placement='top-start'>
        <span>
          <ToggleButtonGroup disabled={disabled} exclusive={!multiple} className='ZChoice-options' data-name={name}>
            {choices.map(renderChoice)}
          </ToggleButtonGroup>
        </span>
      </Tooltip>
    </ZStack>
  );
}
