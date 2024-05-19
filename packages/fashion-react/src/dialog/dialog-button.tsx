import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useEffect, useState } from 'react';
import { IZButton, ZButton } from '../button/button';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZDialog } from './use-dialog';

export interface IZDialogButton extends IZComponentStyle {
  ButtonProps?: Omit<IZButton, 'onClick'>;

  closeOnChange?: any[];

  renderDialog<T extends IZDialog = IZDialog>(props: T): ReactNode;
}

export function ZDialogButton(props: IZDialogButton) {
  const { className, closeOnChange, ButtonProps, renderDialog } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, closeOnChange || []);

  return (
    <div className={cssJoinDefined('ZDialogButton-root', className)}>
      <ZButton label='Open' {...ButtonProps} onClick={setOpen.bind(null, true)} />
      {renderDialog({ open: !!open, onClose: setOpen.bind(null, false) })}
    </div>
  );
}
