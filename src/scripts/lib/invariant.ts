/*
 * Inspired by tiny-invariant
 * https://github.com/alexreardon/tiny-invariant/blob/master/src/tiny-invariant.ts
 */

/** Error thrown when an invariant failure occurs. */
export class InvariantError extends Error {
  constructor(message: string | undefined) {
    super(message ? `Invariant failed: ${message}` : 'Invariant failed');
  }
}

/**
 * Asserts the condition is truthy, throwing an error if it is not.
 *
 * @param condition The condition to check.
 * @param message The message to include in the error.
 */
export function invariant(condition: unknown, message?: string | (() => string)): asserts condition {
  // condition is truthy
  if (condition) {
    return;
  }

  // condition is falsy - invariant failed
  throw new InvariantError(typeof message === 'function' ? message() : message);
}
