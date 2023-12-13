import { NS } from '@ns';

import { context } from '/scripts/lib/context';
import { singleton } from '/scripts/lib/singleton';

import { AppContextProvider } from '/ui/bit-app/AppContext';
import { Main } from '/ui/bit-app/Main';
import { Style } from '/ui/bit-app/Style';
import { Summoner } from '/ui/bit-app/Summoner';
import { React, ReactDOM } from '/ui/lib/react';

const APP_CONTAINER_ID = 'bit-ui-app-container';

const cheatyDocument = eval('document') as Document & typeof globalThis;

/** Entrypoint for the BitUI app. */
export async function main(ns: NS): Promise<void> {
  const ctx = context.init(ns);

  // kill previous bit-ui instances
  singleton.replace(ctx);

  // ensure containers from previous instances are removed
  document.querySelectorAll(`#${APP_CONTAINER_ID}`).forEach((el) => el.remove());

  // mount container for the main UI
  const div = document.createElement('div');
  div.setAttribute('id', APP_CONTAINER_ID);
  div.setAttribute('class', 'bui bui-main-container');
  document.body.appendChild(div);

  // hack: ensure the overview container row covers the width of the panel
  document.getElementById('overview-extra-hook-0')?.parentElement?.setAttribute('colspan', '2');

  // render the UI
  ReactDOM.render(
    <React.StrictMode>
      <AppContextProvider ctx={ctx}>
        <BitUiRoot />
      </AppContextProvider>
    </React.StrictMode>,
    cheatyDocument.getElementById('overview-extra-hook-0'),
  );

  // unmount the UI when the script exits
  ns.atExit(() => {
    ReactDOM.unmountComponentAtNode(cheatyDocument.getElementById('overview-extra-hook-0')!);
    document.getElementById(APP_CONTAINER_ID)?.remove();
  });

  // keep the script running
  const pid = ns.pid;
  while (ns.isRunning(pid)) {
    await ns.asleep(1000);
  }
}

/** App root */
function BitUiRoot() {
  const [isShow, setIsShow] = React.useState(true);

  return (
    <>
      <BitUiMainPortal isShow={isShow} onClose={() => setIsShow(false)} />
      <Style />
      <Summoner isShowingApp={isShow} onToggleShowApp={() => setIsShow((value) => !value)} />
    </>
  );
}

/** Portal to render the main UI. */
function BitUiMainPortal({ isShow, onClose }: { isShow: boolean; onClose: () => void }) {
  const containerEl = React.useMemo(() => cheatyDocument.getElementById(APP_CONTAINER_ID)!, []);

  // toggle class on container when showing
  React.useEffect(() => {
    if (isShow) {
      containerEl.classList.add('bui-on');
    } else {
      containerEl.classList.remove('bui-on');
    }
  }, [isShow]);

  // mount main UI on the container
  return ReactDOM.createPortal(<Main isShow={isShow} onClose={onClose} />, containerEl);
}
