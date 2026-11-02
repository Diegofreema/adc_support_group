/** Nigerian phone number helpers shared by every form and import. */

/** "0803 555 0142" / "+234 803…" / "803…" → "08035550142" */
export function normalisePhone(input: string): string {
  const digits = input.replace(/\D/g, '')
  if (digits.startsWith('234')) return `0${digits.slice(3)}`
  if (digits.length === 10) return `0${digits}`
  return digits
}

export function isValidPhone(input: string): boolean {
  return /^0[789][01]\d{8}$/.test(normalisePhone(input))
}

/** "08062214590" → "0806 221 4590" */
export function formatPhone(phone: string): string {
  const digits = normalisePhone(phone)
  return digits.length === 11 ? `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}` : phone
}
