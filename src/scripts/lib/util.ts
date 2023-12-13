import { Context } from '/scripts/lib/context';

/**
 * Formats the given number as a currency amount.
 *
 * @param context the global context
 * @param amount the number to format
 * @returns formatted amount
 */
export function formatAmount({ ns }: Context, amount: number): string {
  return '$' + ns.formatNumber(amount, 2);
}
