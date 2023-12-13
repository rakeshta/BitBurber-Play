import { NS } from '@ns';

import { context } from '/scripts/lib/context';

/** Utility to restart a running script when it's updated. */
export async function main(ns: NS): Promise<void> {
  const { term } = context.init(ns);

  // collect hashes for all scripts in the home computer
  const hashes: Record<string, number> = {};
  const files = ns.ls('home', '.js');
  for (const file of files) {
    const contents = ns.read(file);
    hashes[file] = computeHash(contents);
  }

  // repeatedly check all scripts for updated & restart if necessary
  while (true) {
    const files = ns.ls('home', '.js');
    for (const file of files) {
      // compute hash for the file. skip if it hasn't changed
      const contents = ns.read(file);
      const hash = computeHash(contents);
      if (hash === hashes[file]) {
        continue;
      }

      // the script has changed
      term.debug(`Detected change in ${file}`);

      // find running processes for the script & restart them
      const processes = ns.ps().filter((p) => p.filename == file);
      for (const process of processes) {
        term.info(`Restarting ${process.filename} ${process.args} -t ${process.threads}`);
        if (process.filename != ns.getScriptName()) {
          ns.kill(process.pid);
          ns.run(process.filename, process.threads, ...process.args);
        } else {
          ns.spawn(process.filename, process.threads, ...process.args);
        }
      }

      // save the updated hash
      hashes[file] = hash;
    }

    // wait a second and check again
    await ns.sleep(1000);
  }
}

/** Computes a hash for the given string. */
function computeHash(input: string): number {
  let hash = 0,
    i,
    chr;
  if (input.length === 0) return hash;
  for (i = 0; i < input.length; i++) {
    chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
