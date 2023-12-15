import { NS } from '@ns';

import { context } from '/scripts/lib/context';
import { invariant } from '/scripts/lib/invariant';

export async function main(ns: NS): Promise<void> {
  const { channels } = context.init(ns);

  // parse arguments
  invariant(ns.args.length === 2, 'Expecting arguments: channel id, host');
  const channelId = `${ns.args[0]}`;
  const host = `${ns.args[1]}`;

  // scan host & collect detailed info about the neighbors
  const servers = ns.scan(host).map(ns.getServer);

  // return result on the communication channel & terminate
  channels.send(channelId, { data: servers });
  channels.close(channelId);
}
