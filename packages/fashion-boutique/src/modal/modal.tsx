import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { rgb } from '@zthun/fashion-theme';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode } from 'react';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZComponentWidth } from '../component/component-width.mjs';
import { useFashionTheme } from '../theme/fashion.mjs';
import { createStyleHook } from '../theme/styled';

export interface IZModal
  extends IZComponentHierarchy,
    IZComponentName,
    IZComponentStyle,
    IZComponentFashion,
    Pick<IZComponentWidth<ZSizeVaried>, 'width'> {
  open: boolean;

  renderHeader?(): ReactNode;
  renderFooter?(): ReactNode;

  onClose?(): void;
}

const useModalStyles = createStyleHook(({ theme, tailor }, props: IZModal) => {
  const { surface, transparent } = theme;
  const { fashion = transparent } = props;

  return {
    root: {
      '.MuiDialog-paper': {
        backgroundColor: surface.main,
        color: surface.contrast
      },

      '.MuiModal-backdrop': {
        backgroundColor: rgb(0, 0, 0, 0.8)
      }
    },

    header: {
      backgroundColor: fashion.main,
      color: fashion.contrast,
      marginBottom: tailor.gap(ZSizeFixed.Small)
    }
  };
});

export function ZModal(props: IZModal) {
  const { transparent } = useFashionTheme();
  const {
    open,
    children,
    className,
    name,
    fashion = transparent,
    width = ZSizeVaried.Fit,
    renderHeader,
    renderFooter,
    onClose
  } = props;
  const { classes } = useModalStyles(props);
  const fullScreen = width === ZSizeVaried.Full;

  const _renderHeader = () => {
    if (!renderHeader) {
      return null;
    }

    return <DialogTitle className={cssJoinDefined('ZModal-header', classes.header)}>{renderHeader()}</DialogTitle>;
  };

  const _renderFooter = () => {
    if (!renderFooter) {
      return null;
    }

    return <DialogActions className={cssJoinDefined('ZModal-footer')}>{renderFooter()}</DialogActions>;
  };

  return (
    <Dialog
      className={cssJoinDefined('ZModal-root', className, classes.root)}
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      data-fashion={fashion.name}
      data-name={name}
      data-width={width}
    >
      {_renderHeader()}
      <DialogContent className={cssJoinDefined('ZModal-content')}>{children}</DialogContent>
      {_renderFooter()}
    </Dialog>
  );
}
