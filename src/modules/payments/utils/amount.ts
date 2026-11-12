import { formatNumber } from '@/lib/format'

/** Quick-pick amounts in the pay wizard. */
export const QUICK_AMOUNTS = [1_000, 5_000, 10_000, 50_000, 100_000]

/** "250,000" / "₦250000" → 250000 */
export function parseAmount(input: string): number {
  const digits = input.replace(/\D/g, '')
  return digits ? Number(digits) : 0
}

/** 250000 → "250,000"; 0 → "" so the placeholder shows. */
export function formatAmountInput(amount: number): string {
  return amount ? formatNumber(amount) : ''
}
