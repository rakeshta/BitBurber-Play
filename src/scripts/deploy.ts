import { NS } from '@ns';

import { context } from '/scripts/lib/context';

export async function main(ns: NS): Promise<void> {
  const { term } = context.init(ns);

  // abort if args count not met
  if (ns.args.length < 2) {
    term.error('Missing arguments');
    term.info(`Usage: ${ns.getScriptName()} <script> <host>`);
    ns.exit();
  }

  // extract args
  const script = `${ns.args[0]}`;
  const host = `${ns.args[1]}`;

  term.info(`Deploying script ${script} to ${host}`);

  // nuke the remote server if required
  if (!ns.hasRootAccess(host)) {
    term.info(`Nuking...`);
    ns.nuke(host);
  }

  // kill existing instance if any
  if (ns.isRunning(script, host)) {
    term.warn('Terminating previous instances');
    ns.kill(script, host);
  }

  // copy all libs to target server
  term.info('Uploading libs');
  const libs = ns.ls(ns.getHostname(), '/scripts/lib');
  for (const lib of libs) {
    term.debug(`  Uploading ${lib}`);
    ns.scp(lib, host);
  }

  // copy script to target server
  term.info('Uploading script');
  ns.scp(script, host);

  // determine how many instances of the script can be run
  const scriptRam = ns.getScriptRam(script, host);
  const freeRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
  const threadCount = Math.floor(freeRam / scriptRam);
  term.info('Execution stats');
  term.info(`  Script ram: ${scriptRam}GB`);
  term.info(`  Max ram: ${ns.getServerMaxRam(host)}GB`);
  term.info(`  Used ram: ${ns.getServerUsedRam(host)}GB`);
  term.info(`  Free ram: ${freeRam}GB`);
  term.info(`  Thread count: ${threadCount}`);

  // abort if the server doesn't have enough RAM
  if (threadCount < 1) {
    term.error('Not enough RAM on host');
    ns.exit();
  }

  // run script on target server
  term.info('Launching script');
  const pid = ns.exec(script, host, threadCount);

  // show the output of the script
  ns.tail(pid, host);
  ns.resizeTail(400, 60, pid);
}
