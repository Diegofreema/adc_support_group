/** "+234 803 555 0142" / "0803 555 0142" / "8035550142" → "08035550142" */
export function normalisePhone(input: string): string {
  const digits = input.replace(/\D/g, '')
  if (digits.startsWith('234')) return `0${digits.slice(3)}`
  if (digits.length === 10) return `0${digits}`
  return digits
}

export function isValidNigerianPhone(input: string): boolean {
  return /^0[789][01]\d{8}$/.test(normalisePhone(input))
}
