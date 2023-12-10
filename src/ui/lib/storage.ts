const KEY_PREFIX = 'bit_ui:';

/** Get a value from session storage if found. */
function get<V = unknown>(key: string): V | undefined;
/** Get a value from session storage or default value if not found. */
function get<V = unknown>(key: string, def: V): V;
function get<V = unknown>(key: string, def?: V | undefined): V | undefined {
  const value = sessionStorage.getItem(KEY_PREFIX + key);
  return value ? JSON.parse(value) : def;
}

/** Set a value in session storage */
function set<V = unknown>(key: string, value: V): void {
  sessionStorage.setItem(KEY_PREFIX + key, JSON.stringify(value));
}

/** Remove a value from session storage */
function remove(key: string): void {
  sessionStorage.removeItem(KEY_PREFIX + key);
}

/** Clear session storage */
function clear(): void {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key?.startsWith(KEY_PREFIX)) {
      sessionStorage.removeItem(key);
    }
  }
}

/** Session storage for the app */
export const storage = {
  get,
  set,
  remove,
  clear,
} as const;
