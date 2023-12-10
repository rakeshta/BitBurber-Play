import { React } from '/ui/lib/react';
import { CloseButton } from '/ui/widgets/CloseButton';

export interface Props {
  isShow: boolean;
  onClose: () => void;
}

export function Main({ isShow, onClose }: Props) {
  return (
    <>
      {isShow && (
        <div className='bui-main'>
          <div className='bui-main-header'>
            <h2 className='bui-my-2 flex-1 bui-fg-secondary'>Bit UI</h2>
            <CloseButton onClose={onClose} />
          </div>
          <div className='bui-main-body'></div>
        </div>
      )}
    </>
  );
}
