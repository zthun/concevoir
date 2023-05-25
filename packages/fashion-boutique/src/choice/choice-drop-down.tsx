import { IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { castArray, isArray } from 'lodash';
import React, { ReactNode } from 'react';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { ZLabeled } from '../label/labeled';
import { createStyleHook } from '../theme/styled';
import { IZChoice, IZChoiceOption, useChoice } from './choice';

const useChoiceDropDownStyles = createStyleHook(({ theme, tailor }) => {
  return {
    root: {
      '.MuiInputBase-root': {
        color: theme.surface.contrast,
        backgroundColor: firstDefined(theme.surface.main, theme.surface.light)
      },

      '.MuiSelect-icon': {
        color: theme.surface.contrast
      },

      '.MuiSelect-select': {
        padding: tailor.gap(ZSizeFixed.Small)
      }
    },

    clear: {
      'color': theme.surface.contrast,
      'backgroundColor': firstDefined(theme.surface.main, theme.surface.light),
      'fontSize': '1.2rem',
      'padding': tailor.gap(ZSizeFixed.ExtraSmall),
      'marginRight': `${tailor.gap(ZSizeFixed.Small)} !important`,

      '&:hover': {
        color: theme.primary.contrast,
        backgroundColor: theme.primary.main
      }
    },

    chip: {
      'display': 'inline-flex',
      'flexWrap': 'wrap',

      '.ZChoice-value': {
        fontSize: '0.8125rem',
        backgroundColor: firstDefined(theme.surface.main, theme.surface.dark),
        color: 'inherit',
        borderRadius: '1rem',
        padding: `calc(${tailor.gap(ZSizeFixed.ExtraSmall)} * 0.5)`,
        margin: 3
      }
    },

    toggler: {
      '.ZChoice-toggler': {
        padding: tailor.gap(ZSizeFixed.ExtraSmall)
      }
    },

    popup: {
      ul: {
        color: theme.surface.contrast,
        backgroundColor: firstDefined(theme.surface.main, theme.surface.light)
      }
    }
  };
});

/**
 * Represents a choice object that implements a drop down.
 *
 * @param props -
 *        The properties for the choice component.
 *
 * @returns
 *        The JSX to render the choice component.
 */
export function ZChoiceDropDown<O, V>(props: IZChoice<O, V>) {
  const { className, label, disabled, multiple, name, indelible, orientation, required } = props;
  const { choices, value, lookup, cast, render, setValue } = useChoice(props);
  const { classes } = useChoiceDropDownStyles();

  const handleSelect = (event: SelectChangeEvent<any>) => {
    const selected = castArray(event.target.value);
    setValue(selected);
  };

  function renderDropDownItems() {
    const renderMenuItem = (choice: IZChoiceOption<O, V>) => {
      const { key, value, option } = choice;

      return (
        <MenuItem className='ZChoice-option' key={key} value={value as any}>
          {render(option)}
        </MenuItem>
      );
    };

    return choices.map(renderMenuItem);
  }

  function renderClear() {
    const empty = !value?.length;

    if (empty || disabled || indelible) {
      return null;
    }

    return (
      <IconButton className={cssJoinDefined('ZChoice-clear', classes.clear)} onClick={setValue.bind(null, [])}>
        <ZIconFontAwesome name='xmark' width={ZSizeFixed.ExtraSmall} />
      </IconButton>
    );
  }

  function renderSelectedItem(value: O | V | string) {
    const _renderSelected = (option: IZChoiceOption<O, V> | undefined) => {
      const key = option == null ? String(value) : option.key;
      const _value = option == null ? value : option.value;
      const element: ReactNode = option == null ? String(value) : render(option.option);

      return (
        <div className='ZChoice-value' key={key} data-value={_value}>
          {element}
        </div>
      );
    };

    if (isArray(value)) {
      return (
        <div className={cssJoinDefined('ZChoice-chip-list', classes.chip)}>
          {value.map((v) => lookup.get(v)).map((option) => _renderSelected(option))}
        </div>
      );
    }

    const option = lookup.get(value);
    return _renderSelected(option);
  }

  return (
    <ZLabeled
      className={cssJoinDefined('ZChoice-root', 'ZChoice-drop-down', className, classes.root)}
      LabelProps={{ label, required, className: 'ZChoice-label' }}
      name={name}
      orientation={orientation}
    >
      {(id) => (
        <Select
          className={cssJoinDefined(classes.toggler)}
          classes={{ select: 'ZChoice-toggler' }}
          labelId={id}
          disabled={disabled}
          value={cast(value, '')}
          multiple={multiple}
          MenuProps={{ className: cssJoinDefined('ZChoice-options', 'ZChoice-options-popup', classes.popup) }}
          onChange={handleSelect}
          renderValue={renderSelectedItem}
          endAdornment={renderClear()}
          name={name}
        >
          {renderDropDownItems()}
        </Select>
      )}
    </ZLabeled>
  );
}
