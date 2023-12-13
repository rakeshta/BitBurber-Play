const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/** All previously generated UIDs. */
const uids = (window.__bit_uids = window.__bit_uids || new Set<string>());

/** Unique ID generator. */
export const uid = {
  /**
   * Generates a (session) unique ID.
   *
   * @param length _(optional)_ Length of the ID to generate. Defaults to 16.
   * @returns a unique ID never seen before in the current session
   */
  generate(length = 16): string {
    let id: string;
    do {
      id = '';
      for (let i = 0; i < length; i++) {
        id += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    } while (uids.has(id));
    uids.add(id);
    return id;
  },
} as const;
