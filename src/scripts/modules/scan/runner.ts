import { Server } from '@ns';

import { Context } from '/scripts/lib/context';
import { run } from '/scripts/modules/run-helper';

const EXE_PATH = '/scripts/modules/scan/exe.js';

/**
 * Scans the given host for neighboring servers.
 *
 * @param ctx The global context.
 * @param host The host to scan.
 * @returns A list of neighboring servers.
 */
export async function scan(ctx: Context, host: string): Promise<Server[]> {
  let servers: Server[] = [];
  await run({
    ctx,
    exePath: EXE_PATH,
    args: [host],
    onMessage: (message) => (servers = message.data as Server[]),
  });
  return servers;
}
