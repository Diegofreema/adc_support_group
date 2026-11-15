/** Build a WhatsApp share URL for a message. */
export function whatsappShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

const LOCAL_HOST = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?(\/|$)/i

/**
 * Where the app is served: VITE_SITE_URL when set, else the current origin.
 * A localhost VITE_SITE_URL (a dev value copied into a deploy) is ignored on
 * a real site, so shared links never point at someone's own computer.
 */
export function siteOrigin(): string {
  const configured = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()
  const here = window.location.origin
  const usable = configured && !(LOCAL_HOST.test(configured) && !LOCAL_HOST.test(here))
  return (usable ? configured : here).replace(/\/+$/, '')
}

/** Full join URL for a group or chapter code, e.g. https://site/join/atiku-women-x7k2. */
export function joinLink(code: string): string {
  return `${siteOrigin()}/join/${encodeURIComponent(code)}`
}

/**
 * Pull a join code out of whatever someone pasted: a full link
 * (…/join/<code>, or the old …/j/<code>) or the bare code.
 */
export function joinCodeFrom(input: string): string | null {
  const value = input.trim()
  if (!value) return null
  const match = value.match(/\/j(?:oin)?\/([^/?#\s]+)/i)
  const code = decodeURIComponent(match ? match[1] : value).trim().toLowerCase()
  return /^[a-z0-9][a-z0-9-]{1,80}$/.test(code) ? code : null
}
