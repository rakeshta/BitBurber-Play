import { NS } from '@ns';

const MAX_ITER = 10;

export async function main(ns: NS): Promise<void> {
  ns.disableLog('ALL');

  /**
   * @param {number} amount the number to format
   * @returns {string} formatted amount
   */
  function formatAmount(amount) {
    return ns.formatNumber(amount, 2);
  }

  // hostname
  const host = ns.args.length > 0 ? ns.args[0] : ns.getHostname();
  ns.print(`Starting on host: ${host}`);
  ns.setTitle(`Basic hack: ${host}`);

  // hack limits
  const maxMoney = ns.getServerMaxMoney(host);
  const minSecurity = ns.getServerMinSecurityLevel(host);

  // hack loop
  let iterCounter = MAX_ITER;
  while (true) {
    ns.print(`Loop: Host - ${host}. Current iter count - ${iterCounter}.`);

    // maximize money
    const availableMoney = ns.getServerMoneyAvailable(host);
    ns.print(`Available money: ${formatAmount(availableMoney)}`);
    if (availableMoney < maxMoney && iterCounter > 0) {
      iterCounter--;
      ns.print(`Growing money. Target ${formatAmount(maxMoney)}.`);
      await ns.grow(host);
      continue;
    }

    // minimize security
    const security = ns.getServerSecurityLevel(host);
    ns.print(`Current security: ${security}`);
    if (security > minSecurity && iterCounter > 0) {
      iterCounter--;
      ns.print(`Weakening security. Target ${security}`);
      await ns.weaken(host);
      continue;
    }

    // hack
    ns.print(`Hacking ${host}`);
    await ns.hack(host);

    // reset iteration counter
    iterCounter = MAX_ITER;
  }
}
