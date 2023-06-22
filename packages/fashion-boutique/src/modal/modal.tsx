import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';

export interface IZModal
  extends IZComponentHierarchy,
    IZComponentName,
    IZComponentStyle,
    Pick<IZComponentWidth<ZSizeVaried>, 'width'> {
  open: boolean;

  renderHeader?(): ReactNode;
  renderFooter?(): ReactNode;

  onClose?(): void;
}

export function ZModal(props: IZModal) {
  const { open, children, className, width = ZSizeVaried.Fit, renderHeader, renderFooter, onClose } = props;
  const fullScreen = width === ZSizeVaried.Full;

  const _renderHeader = () => {
    if (!renderHeader) {
      return null;
    }

    return <DialogTitle className={cssJoinDefined('ZModal-header')}>{renderHeader()}</DialogTitle>;
  };

  const _renderFooter = () => {
    if (!renderFooter) {
      return null;
    }

    return <DialogActions className={cssJoinDefined('ZModal-footer')}>{renderFooter()}</DialogActions>;
  };

  return (
    <Dialog
      className={cssJoinDefined('ZModal-root', className)}
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      data-width={width}
    >
      {_renderHeader()}
      <DialogContent className={cssJoinDefined('ZModal-content')}>{children}</DialogContent>
      {_renderFooter()}
    </Dialog>
  );
}
