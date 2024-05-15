import { useCallback, useEffect } from 'react';

export interface IZDialogProps {
  open: boolean;
  onClose?: () => void;
}
export function useDialog(current: HTMLDialogElement | null, props: IZDialogProps) {
  const { open, onClose } = props;

  const onClosed = useCallback(() => {
    onClose?.call(null);
  }, [onClose]);

  useEffect(() => {
    current?.removeEventListener('close', onClosed);
    current?.addEventListener('close', onClosed);
    return () => current?.removeEventListener('close', onClosed);
  }, [current]);

  useEffect(() => {
    if (open) {
      current?.showModal?.call(current);
    } else {
      current?.close?.call(current);
    }
  }, [current, open]);
}
