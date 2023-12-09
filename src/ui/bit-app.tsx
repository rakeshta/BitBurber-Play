import { NS } from '@ns';

import { singleton } from '/scripts/lib/singleton';
import { init } from '/scripts/lib/util';

import { Style } from '/ui/bit-app/Style';
import { Summoner } from '/ui/bit-app/Summoner';
import { React, ReactDOM } from '/ui/lib/react';

const cheatyDocument = eval('document') as Document & typeof globalThis;

/** Entrypoint for the BitUI app. */
export async function main(ns: NS): Promise<void> {
  init(ns);

  // kill previous bit-ui instances
  singleton.replace();

  // render the UI
  ReactDOM.render(
    <React.StrictMode>
      <Style />
      <Summoner />
    </React.StrictMode>,
    cheatyDocument.getElementById('overview-extra-hook-0'),
  );

  // unmount the UI when the script exits
  ns.atExit(() => ReactDOM.unmountComponentAtNode(cheatyDocument.getElementById('overview-extra-hook-0')!));

  // keep the script running
  const pid = ns.pid;
  while (ns.isRunning(pid)) {
    await ns.asleep(1000);
  }
}
