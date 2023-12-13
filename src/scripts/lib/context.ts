import { NS } from '@ns';

import { ChannelManager, channelManagerFactory } from '/scripts/lib/comms';
import { LevelLoggers, createLoggers } from '/scripts/lib/log';

/** The global context. */
export interface Context {
  ns: NS;

  term: LevelLoggers;
  log: LevelLoggers;

  channels: ChannelManager;
}

/** Channel manager. */

/** Global context manager. */
export const context = {
  /** Initializes the global context. */
  init(ns: NS): Context {
    ns.disableLog('ALL');
    return {
      ns,
      ...createLoggers(ns),
      channels: channelManagerFactory(),
    };
  },
} as const;
