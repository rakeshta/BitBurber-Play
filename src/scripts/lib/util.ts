import { NS } from '@ns';

import { LevelLoggers, createLoggers } from '/scripts/lib/log';

declare global {
  let ns: NS;

  const term: LevelLoggers;
  const log: LevelLoggers;

  interface Window {
    ns: NS;

    term: LevelLoggers;
    log: LevelLoggers;
  }
}

/** Initializes the execution environment and sets up globals.
 *  @param ns The Netscript namespace. */
export function init(ns: NS): void {
  ns.disableLog('ALL');

  // accessing window directly incurs 25GB memory penalty
  const cheatyWindow = eval('window') as Window & typeof globalThis;

  cheatyWindow.ns = ns;

  const { term, log } = createLoggers(ns);
  cheatyWindow.term = term;
  cheatyWindow.log = log;
}

/**
 * Formats the given number as a currency amount.
 *
 * @param amount the number to format
 * @returns formatted amount
 */
export function formatAmount(amount: number): string {
  return ns.formatNumber(amount, 2);
}
