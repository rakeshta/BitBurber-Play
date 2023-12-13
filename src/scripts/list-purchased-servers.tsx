import { NS } from '@ns';

import { context } from '/scripts/lib/context';

export async function main(ns: NS): Promise<void> {
  const { term } = context.init(ns);

  // list purchased servers
  let output = `Purchased servers:\n`;
  const serverNames = ns.getPurchasedServers();
  for (const name of serverNames) {
    const server = ns.getServer(name);
    output += `${server.hostname} / ${server.ip} - ${server.cpuCores} core, ${server.maxRam}GB`;
    output += ` (${server.maxRam - server.ramUsed}GB free)\n`;
  }

  term.info(output);
}
