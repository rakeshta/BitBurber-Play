import { Context } from '/scripts/lib/context';
import { scan } from '/scripts/modules/scan/runner';

/** Type that all modules must satisfy. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Module = (ctx: Context, ...args: any[]) => Promise<unknown>;

/** Obtain additional parameters after the {@link Context} that needs to be passed to a module. */
export type ModuleExtraParameters<T extends Module> =
  T extends (ctx: Context, ...args: infer P) => Promise<unknown> ? P : never;

/** The modules collection type */
export type Modules = typeof modules;

/** The module keys. */
export type ModuleKey = keyof Modules;

/** Parameters (excluding the mandatory context argument) by module key */
export type ModuleParams<K extends ModuleKey> =
  Modules[K] extends (ctx: Context, ...args: infer P) => Promise<unknown> ? P : never;

/** Unwrapped return type by module key */
export type ModuleReturnType<K extends ModuleKey> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Modules[K] extends (ctx: Context, ...args: any[]) => Promise<infer R> ? R : never;

/** Return type by module key */
export type ModuleReturn<K extends ModuleKey> = ReturnType<(typeof modules)[K]>;

/** Collection of all modules. */
export const modules = {
  /**
   * Scans the given host for neighboring servers.
   *
   * @param ctx The global context.
   * @param host The host to scan.
   * @returns A list of neighboring servers.
   */
  scan: scan satisfies Module,
} as const;
