import { Alert, AlertTitle } from '@mui/material';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import React, { ReactNode } from 'react';
import { IZComponentAvatar } from '../component/component-avatar.mjs';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentHeading } from '../component/component-heading.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useFashionTheme } from '../theme/fashion.mjs';
import { createStyleHook } from '../theme/styled';

export interface IZAlert
  extends Omit<IZComponentHeading, 'subheader'>,
    IZComponentName,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentAvatar {
  message: ReactNode;
}

const useAlertStyles = createStyleHook(({ theme, tailor }, props: IZAlert) => {
  const { primary } = theme;
  const { fashion = primary } = props;

  const light = firstDefined(fashion.main, fashion.light);
  const border = firstDefined(fashion.main, fashion.border);

  return {
    root: {
      'display': 'flex',
      'alignItems': 'center',
      'backgroundColor': fashion.main,
      'color': fashion.contrast,
      'boxShadow': `0 0 0 ${tailor.thickness()} ${border}`,
      'border': `${tailor.thickness()} double ${light}`,

      '.MuiAlert-icon': {
        color: 'inherit'
      }
    },

    heading: {
      margin: 0,
      marginBottom: tailor.gap(ZSizeFixed.ExtraSmall)
    }
  };
});

export function ZAlert(props: IZAlert) {
  const { primary } = useFashionTheme();
  const { heading, name, className, message, avatar, fashion = primary } = props;
  const { classes } = useAlertStyles(props);

  const renderHeading = () =>
    heading ? <AlertTitle className={cssJoinDefined('ZAlert-heading', classes.heading)}>{heading}</AlertTitle> : null;

  const renderIcon = () => (avatar ? <div className={cssJoinDefined('ZAlert-avatar')}>{avatar}</div> : ' ');

  return (
    <Alert
      className={cssJoinDefined('ZAlert-root', className, classes.root)}
      icon={renderIcon()}
      data-name={name}
      data-fashion={fashion.name}
    >
      {renderHeading()}
      <div className={cssJoinDefined('ZAlert-message')}>{message}</div>
    </Alert>
  );
}
