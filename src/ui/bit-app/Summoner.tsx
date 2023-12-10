import { React } from '/ui/lib/react';

export interface Props {
  isShowingApp: boolean;
  onToggleShowApp: () => void;
}

/** Component to render a button in the overview panel to show & hide the main window. */
export function Summoner({ isShowingApp, onToggleShowApp }: Props) {
  return (
    <div className='bui-w-full bui-flex bui-items-center bui-justify-center'>
      <button className='bui-m-4 bui-button bui-small' style={{ width: '8rem' }} onClick={onToggleShowApp}>
        {isShowingApp ? 'Hide Bit App' : 'Bit App'}
      </button>
    </div>
  );
}
