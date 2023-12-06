import { NS } from '@ns';
import { createLoggers } from '/scripts/lib/log';

const MAX_NODES = 20;

/** Automatically buys and upgrades hacknet nodes. */
export async function main(ns: NS): Promise<void> {
  ns.disableLog('ALL');

  const { term } = createLoggers(ns);

  // maximum number of nodes we should acquire
  const maxNodes = Math.min(ns.hacknet.maxNumNodes(), MAX_NODES);
  term.info(`Starting hacknet auto upgrader. Max nodes: ${maxNodes}`);
}
