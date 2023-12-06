import { NS } from '@ns';

export async function main(ns: NS): Promise<void> {
  ns.disableLog('ALL');

  // abort if args count not met
  if (ns.args.length < 2) {
    ns.tprint('ERROR Missing arguments');
    ns.tprint(`Usage: ${ns.getScriptName()} <host> <script>`);
    ns.exit();
  }

  // extract args
  const host = `${ns.args[0]}`;
  const script = `${ns.args[1]}`;

  ns.tprint(`Deploying script ${script} to ${host}`);

  // nuke the remote server if required
  if (!ns.hasRootAccess(host)) {
    ns.tprint(`Nuking...`);
    ns.nuke(host);
  }

  // kill existing instance if any
  if (ns.isRunning(script, host)) {
    ns.tprint('WARN Terminating previous instances');
    ns.kill(script, host);
  }

  // determine how many instances of the script can be run
  const scriptRam = ns.getScriptRam(script, host);
  const freeRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
  const threadCount = Math.floor(freeRam / scriptRam);
  ns.tprint('Execution stats');
  ns.tprint(`  Script ram: ${scriptRam}GB`);
  ns.tprint(`  Max ram: ${ns.getServerMaxRam(host)}GB`);
  ns.tprint(`  Used ram: ${ns.getServerUsedRam(host)}GB`);
  ns.tprint(`  Free ram: ${freeRam}GB`);
  ns.tprint(`  Thread count: ${threadCount}`);

  // abort if the server doesn't have enough RAM
  if (threadCount < 1) {
    ns.tprint('ERROR not enough RAM on host');
    ns.exit();
  }

  // copy script to target server
  ns.tprint('Uploading script');
  ns.scp(script, host);

  // run script on target server
  ns.tprint('Launching script');
  const pid = ns.exec(script, host, threadCount);

  // show the output of the script
  ns.tail(pid, host);
}
