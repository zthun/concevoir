import { Button, Tooltip } from '@mui/material';
import React, { ReactNode } from 'react';

import { IZFashion, transparent } from '@zthun/fashion-theme';

import { createSizeChartVariedCss, ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { noop } from 'lodash-es';
import { IZComponentAvatar } from '../component/component-avatar.mjs';
import { IZComponentDisabled } from '../component/component-disabled.mjs';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentLabel } from '../component/component-label.mjs';
import { IZComponentLoading } from '../component/component-loading.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZComponentWidth } from '../component/component-width.mjs';
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
    Pick<IZComponentWidth<ZSizeVaried>, 'width'> {
  borderless?: boolean;
  compact?: boolean;
  outline?: boolean;
  tooltip?: ReactNode;

  onClick?: (e: React.MouseEvent) => any;
}

const ButtonSizeChart = createSizeChartVariedCss();

export const useButtonStyles = createStyleHook(({ theme, tailor }, props: IZButton) => {
  const { width = ZSizeVaried.Fit, fashion = theme.component, compact } = props;

  const text = fashion.contrast;
  const main = fashion.main;
  const border = firstDefined(fashion.main, fashion.border);
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
      'borderColor': border,
      'minWidth': minWidth,

      '&:hover': {
        outline: `${tailor.thickness()} solid ${firstDefined(fashion.main, fashion.hover.border)}`,
        backgroundColor: firstDefined(fashion.main, fashion.hover.main)
      },

      '&:disabled': {
        color: text,
        backgroundColor: main,
        opacity: '0.25'
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
      },

      '&.ZButton-compact': {
        'padding': tailor.thickness(ZSizeFixed.ExtraSmall),

        '.MuiButton-startIcon': {
          marginLeft: 0
        },
        '.MuiButton-endIcon': {
          marginRight: 0
        }
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
    ['ZButton-compact', !!compact],
    className,
    classes.button
  );
  const contentClass = cssJoinDefined('ZButton-content', classes.content);
  const variant = outline ? 'outlined' : 'contained';

  const suspense = loading ? (
    <ZSuspenseRotate className={cssJoinDefined('ZButton-loading', classes.loading)} width={ZSizeFixed.ExtraSmall} />
  ) : null;

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
