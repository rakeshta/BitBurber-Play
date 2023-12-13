import { NS } from '@ns';

import { context } from '/scripts/lib/context';
import { formatAmount } from '/scripts/lib/util';

export async function main(ns: NS): Promise<void> {
  const ctx = context.init(ns);
  const { log } = ctx;

  // hostname & thread count
  const host = ns.args.length > 0 ? `${ns.args[0]}` : ns.getHostname();
  const threads = ns.getRunningScript()?.threads ?? 1;
  log.info(`Starting on host ${host}; threads: ${threads}`);
  ns.setTitle(`Basic hack: ${host}`);

  // hack limits
  const maxMoney = ns.getServerMaxMoney(host);
  const minSecurity = ns.getServerMinSecurityLevel(host);

  // hack loop
  while (true) {
    log.debug(`Loop: Host - ${host}`);

    // maximize money
    const availableMoney = ns.getServerMoneyAvailable(host);
    log.debug(`Available money: ${formatAmount(ctx, availableMoney)}`);
    if (availableMoney < maxMoney) {
      log.info(`Growing money. Target ${formatAmount(ctx, maxMoney)}.`);
      await ns.grow(host, { threads });
    }

    // minimize security
    const security = ns.getServerSecurityLevel(host);
    log.debug(`Current security: ${security}`);
    if (security > minSecurity) {
      log.info(`Weakening security. Target ${minSecurity}`);
      await ns.weaken(host, { threads });
    }

    // hack
    log.info(`Hacking ${host}`);
    await ns.hack(host, { threads });
  }
}
