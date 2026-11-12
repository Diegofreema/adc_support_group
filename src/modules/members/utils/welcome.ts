import type { WelcomeShare } from '../types'

/** "0803 555 0142" → "2348035550142" (the form wa.me wants). */
export function internationalPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('234')) return digits
  if (digits.startsWith('0')) return `234${digits.slice(1)}`
  return digits.length === 10 ? `234${digits}` : digits
}

/** WhatsApp chat with this person, message ready to send. */
export function whatsappTo(person: WelcomeShare): string {
  return `https://wa.me/${internationalPhone(person.phone)}?text=${encodeURIComponent(person.message)}`
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)
}

/** A printable sheet of name, phone and link, opened in its own window and printed. */
export function printWelcomeSheet(title: string, people: WelcomeShare[]): void {
  const rows = people
    .map((p) => `<tr><td>${escapeHtml(p.fullName)}</td><td>${escapeHtml(p.phone)}</td><td>${escapeHtml(p.link)}</td></tr>`)
    .join('')
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title>
<style>body{font:14px system-ui,sans-serif;margin:24px;color:#14181D}h1{font-size:18px}p{color:#555}
table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;text-align:left;vertical-align:top}
td:last-child{word-break:break-all;font-family:monospace;font-size:12px}</style></head>
<body><h1>${escapeHtml(title)}</h1><p>Open the link on your phone and set your password with the code sent to you.</p>
<table><thead><tr><th>Name</th><th>Phone</th><th>Link</th></tr></thead><tbody>${rows}</tbody></table></body></html>`
  const sheet = window.open('', '_blank')
  if (!sheet) throw new Error('Allow pop-ups to print the sheet')
  sheet.document.write(html)
  sheet.document.close()
  sheet.focus()
  sheet.print()
}
