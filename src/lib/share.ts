/** Build a WhatsApp share URL for a message. */
export function whatsappShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export const JOIN_BASE_URL = 'adcsupportgroups.ng/j/'

export function joinLink(code: string): string {
  return `${JOIN_BASE_URL}${code}`
}
