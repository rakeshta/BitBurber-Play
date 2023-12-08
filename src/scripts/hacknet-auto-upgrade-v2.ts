import { NS } from '@ns';

import { formatAmount, init } from '/scripts/lib/util';

// constants -----------------------------------------------------------------------------------------------------------

const MAX_NODES = 25;
const MAX_LEVEL = 200;
const MAX_RAM = 64;
const MAX_CORES = 128;

const MONEY_WAIT = 1000;
const LOOP_WAIT = 50;

// types ---------------------------------------------------------------------------------------------------------------

type Upgrade = {
  cost: number;
  description: string;
  execute: () => boolean;
};

// helpers -------------------------------------------------------------------------------------------------------------

/** Finds upgrades for a node at the given index. */
function findNodeUpgrades(i: number): Upgrade[] {
  const upgrades: Upgrade[] = [];

  const stats = ns.hacknet.getNodeStats(i);
  const descPrefix = `Node #${i + 1} / `;

  // upgrade level
  const levelUpCost = ns.hacknet.getLevelUpgradeCost(i);
  if (stats.level < MAX_LEVEL && levelUpCost < Infinity) {
    upgrades.push({
      cost: levelUpCost,
      description: descPrefix + `level ${stats.level} -> ${stats.level + 1}`,
      execute: () => ns.hacknet.upgradeLevel(i),
    });
  }

  // upgrade ram
  const ramUpCost = ns.hacknet.getRamUpgradeCost(i);
  if (stats.ram < MAX_RAM && ramUpCost < Infinity) {
    upgrades.push({
      cost: ramUpCost,
      description: descPrefix + `RAM ${stats.ram}GB -> ${stats.ram * 2}GB`,
      execute: () => ns.hacknet.upgradeRam(i),
    });
  }

  // upgrade cores
  const coreUpCost = ns.hacknet.getCoreUpgradeCost(i);
  if (stats.cores < MAX_CORES && coreUpCost < Infinity) {
    upgrades.push({
      cost: coreUpCost,
      description: descPrefix + `cores ${stats.cores} -> ${stats.cores + 1}`,
      execute: () => ns.hacknet.upgradeCore(i),
    });
  }

  return upgrades;
}

/** Finds a new hacknet node to purchase. */
function findNodePurchase(): Upgrade | undefined {
  // abort if we're at the max number of nodes
  const maxNodes = Math.min(ns.hacknet.maxNumNodes(), MAX_NODES);
  if (ns.hacknet.numNodes() >= maxNodes) {
    return;
  }

  // an upgrade to purchase a node
  return {
    cost: ns.hacknet.getPurchaseNodeCost(),
    description: `Purchase new node`,
    execute: () => ns.hacknet.purchaseNode() > -1,
  };
}

// main ----------------------------------------------------------------------------------------------------------------

/** Automatically buys and upgrades hacknet nodes. */
export async function main(ns: NS): Promise<void> {
  init(ns);

  // repeatedly find cheapest upgrade and execute until there are no more upgrades left
  while (true) {
    const upgrades: Upgrade[] = [];

    // find upgrades for already owned nodes
    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      // find node upgrades. if there are none, increment the staring index so we can skip this one next time
      const nodeUpgrades = findNodeUpgrades(i);
      if (nodeUpgrades.length == 0) {
        term.debug(`No upgrades for node #${i + 1}`);
        continue;
      }

      // collect upgrades
      upgrades.push(...nodeUpgrades);
    }

    // find next node purchase
    const nodePurchase = findNodePurchase();
    if (nodePurchase) {
      upgrades.push(nodePurchase);
    }

    // stop when there are no upgrades left
    if (upgrades.length == 0) {
      term.info('No upgrades left. Stopping.');
      ns.exit();
    }

    // find the cheapest upgrade
    const cheapestUpgrade = _.minBy(upgrades, (u) => u.cost)!;

    // wait until we have enough money
    let isWaitNotified = false;
    while (cheapestUpgrade.cost > ns.getServerMoneyAvailable('home')) {
      if (!isWaitNotified) {
        term.info(`Next upgrade: ${cheapestUpgrade.description} for $${formatAmount(cheapestUpgrade.cost)}`);
        isWaitNotified = true;
      }

      await ns.sleep(MONEY_WAIT);
    }

    // execute upgrade
    term.info(`Executing upgrade: ${cheapestUpgrade.description} for $${formatAmount(cheapestUpgrade.cost)}`);
    cheapestUpgrade.execute();

    // delay to ensure UI responsiveness
    await ns.sleep(LOOP_WAIT);
  }
}
