import {
  IZComponentClose,
  IZComponentFashion,
  IZComponentHierarchy,
  IZComponentName,
  IZComponentOpen
} from '@zthun/fashion-boutique';
import { ReactNode, useCallback, useEffect } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';

export interface IZDialogProps
  extends IZComponentFashion,
    IZComponentHierarchy<ReactNode>,
    IZComponentName,
    IZComponentStyle {
  open: boolean;
  persistent?: boolean;

  onClose?: () => void;
  renderHeader?(): ReactNode;
  renderFooter?(): ReactNode;
}
export function useDialog(current: (HTMLElement & IZComponentOpen & IZComponentClose) | null, props: IZDialogProps) {
  const { open, onClose } = props;

  const onClosed = useCallback(() => onClose?.call(null), [onClose]);

  useEffect(() => {
    current?.removeEventListener('close', onClosed);
    current?.addEventListener('close', onClosed);

    return () => {
      current?.removeEventListener('close', onClosed);
    };
  }, [current, onClosed]);

  useEffect(() => {
    if (open) {
      current?.open?.call(current);
    } else {
      current?.close?.call(current);
    }
  }, [current, open]);
}
