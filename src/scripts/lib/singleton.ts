import { Context } from '/scripts/lib/context';

/** Utilities to manage singleton processes. */
export const singleton = {
  /** Takes over as the new singleton instance by killing previous instances. */
  replace({ ns, term }: Context): void {
    // iterate through running scripts and kill other instances
    let isNotified = false;
    const scriptName = ns.getScriptName();
    for (const instance of ns.ps()) {
      // abort if this is not an instance of this script
      if (instance.filename !== scriptName || instance.pid === ns.pid) {
        continue;
      }

      // notify once
      if (!isNotified) {
        term.warn(`Replacing previous instance of ${scriptName}`);
        isNotified = true;
      }

      // kill previous instance
      ns.kill(instance.pid);
    }
  },
} as const;
