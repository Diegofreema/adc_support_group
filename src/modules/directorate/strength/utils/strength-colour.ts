const RED = [0xef, 0x44, 0x44]
const AMBER = [0xf5, 0x9e, 0x0b]
const GREEN = [0x22, 0xc5, 0x5e]

/** Shade between `from` and `to`, t in 0..1, as 0xRRGGBB. */
function mix(from: number[], to: number[], t: number): number {
  const [r, g, b] = from.map((c, i) => Math.round(c + (to[i] - c) * t))
  return (r << 16) | (g << 8) | b
}

/** Weak (red) → middling (amber) → strong (green), for a share of the strongest. */
export function strengthHex(fraction: number): number {
  const t = Math.min(Math.max(fraction, 0), 1)
  return t < 0.5 ? mix(RED, AMBER, t * 2) : mix(AMBER, GREEN, (t - 0.5) * 2)
}

export function hexCss(hex: number): string {
  return `#${hex.toString(16).padStart(6, '0')}`
}
