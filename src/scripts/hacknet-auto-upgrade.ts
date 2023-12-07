import { NS } from '@ns';
import { createLoggers } from '/scripts/lib/log';

const MAX_NODES = 25;
const MAX_LEVEL = 200;
const MAX_RAM = 64;
const MAX_CORES = 10;

const LOOP_WAIT = 1000;

/** Automatically buys and upgrades hacknet nodes. */
export async function main(ns: NS): Promise<void> {
  ns.disableLog('ALL');

  const { term } = createLoggers(ns);

  // maximum number of nodes we should acquire
  const maxNodes = Math.min(ns.hacknet.maxNumNodes(), MAX_NODES);
  term.info(`Starting hacknet auto upgrader. Max nodes: ${maxNodes}`);

  // buy nodes until we reach the max
  while (ns.hacknet.numNodes() < maxNodes) {
    // get available money & cost of buying
    const money = ns.getServerMoneyAvailable('home');
    const cost = ns.hacknet.getPurchaseNodeCost();

    // wait for a while & try again
    if (money < cost) {
      await ns.sleep(LOOP_WAIT);
      continue;
    }

    // buy node
    term.info(`Buying node #${ns.hacknet.numNodes() + 1} for ${ns.formatNumber(cost, 2)}`);
    ns.hacknet.purchaseNode();
  }

  // helper to upgrade a stat on all nodes until they reach the max
  async function upgradeNodes(
    stat: string,
    max: number,
    getStat: (i: number) => number,
    getCost: (i: number) => number,
    upgrade: (i: number) => boolean
  ) {
    term.info(`Begin upgrading ${stat}`);

    while (true) {
      // find the cheapest node to upgrade
      const [cheapestNode, cheapestCost] = Array(ns.hacknet.numNodes())
        .fill(0)
        .reduce<[number | undefined, number]>(
          ([cheapestNode, cheapestCost], _, i) => {
            // skip if node is already at max level
            if (getStat(i) >= max) {
              return [cheapestNode, cheapestCost];
            }

            // find the cost and check if it's cheaper than the current cheapest
            const cost = getCost(i);
            return cost < cheapestCost ? [i, cost] : [cheapestNode, cheapestCost];
          },
          [undefined, Infinity]
        );

      // break if all nodes are at max level
      if (cheapestNode === undefined) {
        break;
      }

      // wait until we have enough money to upgrade
      while (ns.getServerMoneyAvailable('home') < cheapestCost) {
        await ns.sleep(LOOP_WAIT);
      }

      // purchase upgrade
      term.info(
        `Upgrading node #${cheapestNode + 1} ${stat} from ${getStat(cheapestNode)} for ${ns.formatNumber(
          cheapestCost,
          2
        )}`
      );
      const success = upgrade(cheapestNode);
      if (!success) {
        term.error(`Failed to upgrade node #${cheapestNode + 1} ${stat}`);
        break;
      }
    }
  }

  // upgrade nodes
  await upgradeNodes(
    'level',
    MAX_LEVEL,
    (i) => ns.hacknet.getNodeStats(i).level,
    (i) => ns.hacknet.getLevelUpgradeCost(i),
    (i) => ns.hacknet.upgradeLevel(i)
  );
  await upgradeNodes(
    'RAM',
    MAX_RAM,
    (i) => ns.hacknet.getNodeStats(i).ram,
    (i) => ns.hacknet.getRamUpgradeCost(i),
    (i) => ns.hacknet.upgradeRam(i)
  );
  await upgradeNodes(
    'cores',
    MAX_CORES,
    (i) => ns.hacknet.getNodeStats(i).cores,
    (i) => ns.hacknet.getCoreUpgradeCost(i),
    (i) => ns.hacknet.upgradeCore(i)
  );
}
