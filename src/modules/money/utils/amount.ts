/** "2,500" / "₦2500" → 2500 */
export function parseAmount(input: string): number {
  const digits = input.replace(/\D/g, '')
  return digits ? Number(digits) : 0
}

/** Local calendar day, YYYY-MM-DD. */
export function today(): string {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
}
