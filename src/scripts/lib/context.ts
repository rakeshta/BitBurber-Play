import { NS } from '@ns';

import { LevelLoggers, createLoggers } from '/scripts/lib/log';

export interface Context {
  ns: NS;

  term: LevelLoggers;
  log: LevelLoggers;
}

/** Global context manager. */
export const context = {
  /** Initializes the global context. */
  init(ns: NS): Context {
    ns.disableLog('ALL');

    // create loggers
    const { term, log } = createLoggers(ns);

    // create & return the context
    return {
      ns,

      term,
      log,
    };
  },
} as const;
