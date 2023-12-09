import { React } from '/ui/lib/react';

export interface Props {
  isShow: boolean;
}

export function Main({ isShow }: Props) {
  return (
    <>
      {isShow && (
        <div className='bui-main'>
          <h2 className='bui-mx-2 bui-mt-1 bui-fg-primary'>Bit UI</h2>
        </div>
      )}
    </>
  );
}
