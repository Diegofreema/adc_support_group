/** "Atiku Women Network" → "atiku-women-x7k2" (unique enough for a mock). */
export function makeJoinCode(name: string): string {
  const slug = name.toLowerCase().split(/\s+/).slice(0, 2).join('-').replace(/[^a-z-]/g, '')
  const suffix = Math.random().toString(36).slice(2, 6)
  return `${slug}-${suffix}`
}
