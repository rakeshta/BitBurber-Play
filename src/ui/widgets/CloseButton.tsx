import { clsx } from '/ui/lib/clsx';
import { React } from '/ui/lib/react';

export interface Props {
  className?: string;
  isCloseOnEscape?: boolean;
  onClose?: () => void;
}

export function CloseButton({ className, isCloseOnEscape = true, onClose }: Props) {
  React.useEffect(() => {
    if (isCloseOnEscape) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose?.();
        }
      };

      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }

    return;
  }, [isCloseOnEscape, onClose]);

  return (
    <button className={clsx('bui-close-button', className)} onClick={onClose}>
      X
    </button>
  );
}
