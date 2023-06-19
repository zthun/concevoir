import { Button, Tooltip } from '@mui/material';
import React, { ReactNode } from 'react';

import { IZFashion, transparent } from '@zthun/fashion-theme';

import { createSizeChartVariedCss, ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { noop } from 'lodash';
import { IZComponentAvatar } from '../component/component-avatar';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentLoading } from '../component/component-loading';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { ZSuspenseRotate } from '../suspense/suspense-rotate';
import { createStyleHook } from '../theme/styled';

export interface IZButton
  extends IZComponentAvatar,
    IZComponentLabel,
    IZComponentDisabled,
    IZComponentLoading,
    IZComponentStyle,
    IZComponentName,
    IZComponentFashion<IZFashion>,
    IZComponentWidth<ZSizeVaried> {
  borderless?: boolean;
  compact?: boolean;
  outline?: boolean;
  tooltip?: ReactNode;

  onClick?: (e: React.MouseEvent) => any;
}

const ButtonSizeChart = createSizeChartVariedCss();

const useButtonStyles = createStyleHook(({ theme, tailor }, props: IZButton) => {
  const { width = ZSizeVaried.Fit, fashion = theme.body, compact } = props;

  const text = fashion.contrast;
  const main = fashion.main;
  const dark = firstDefined(fashion.main, fashion.dark);
  const light = firstDefined(fashion.main, fashion.light);
  const minWidth = compact ? 0 : undefined;

  const borderless = {
    border: 0,
    outline: 'none',
    boxShadow: 'none'
  };

  return {
    wrapper: {
      display: 'inline-flex',
      width: ButtonSizeChart[width]
    },

    button: {
      'display': 'inline-flex',
      'alignItems': 'center',
      'width': '100%',
      'color': text,
      'backgroundColor': main,
      'borderColor': dark,
      'minWidth': minWidth,

      '&:hover': {
        outline: `${tailor.thickness()} solid ${light}`,
        backgroundColor: dark
      },

      '&:disabled': {
        color: 'rgb(0, 0, 0, 0.25)'
      },

      '&.ZButton-outline': {
        'backgroundColor': transparent(),
        'color': main,
        'borderColor': main,

        '&:disabled': {
          color: 'rgb(0, 0, 0, 0.25)'
        },

        '&:hover': {
          backgroundColor: main,
          color: text
        }
      },

      '&.ZButton-borderless': {
        ...borderless,
        '&:hover': borderless,
        '&:active': borderless
      }
    },

    content: {
      display: 'flex'
    },

    loading: {
      marginLeft: tailor.gap(ZSizeFixed.ExtraSmall)
    }
  };
});

/**
 * Represents a basic button component.
 *
 * @param props -
 *        The properties for this button.
 *
 * @returns The JSX to render this button.
 */
export function ZButton(props: IZButton) {
  const {
    avatar,
    className,
    borderless,
    compact,
    disabled,
    fashion,
    loading,
    label,
    name,
    outline,
    tooltip,
    onClick = noop
  } = props;

  const { classes } = useButtonStyles(props);
  const buttonClass = cssJoinDefined(
    'ZButton-root',
    ['ZButton-borderless', !!borderless],
    ['ZButton-outline', !!outline],
    className,
    classes.button
  );
  const contentClass = cssJoinDefined('ZButton-content', classes.content);
  const variant = outline ? 'outlined' : 'contained';

  const suspense = (
    <ZSuspenseRotate
      className={cssJoinDefined('ZButton-loading', classes.loading)}
      width={ZSizeFixed.ExtraSmall}
      loading={!!loading}
    />
  );
  return (
    <Tooltip title={tooltip}>
      <span className={classes.wrapper}>
        <Button
          className={buttonClass}
          variant={variant}
          disabled={disabled}
          onClick={onClick}
          name={name}
          startIcon={avatar}
          endIcon={suspense}
          data-compact={compact}
          data-fashion={fashion?.name}
        >
          <div className={contentClass}>{label}</div>
        </Button>
      </span>
    </Tooltip>
  );
}
