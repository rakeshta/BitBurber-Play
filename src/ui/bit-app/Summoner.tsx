import { React } from '/ui/lib/react';

/** Component to render a button in the overview panel to show & hide the main window. */
export function Summoner() {
  return (
    <div className='bui-w-full bui-flex bui-items-center bui-justify-center'>
      <button className='bui-m-4 bui-button bui-medium' onClick={() => console.log('Hello')}>
        Bit App
      </button>
    </div>
  );
}
