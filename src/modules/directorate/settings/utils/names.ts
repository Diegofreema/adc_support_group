export function cleanName(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}
