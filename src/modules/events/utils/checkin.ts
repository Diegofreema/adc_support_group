/** What the venue QR opens: /events/checkin/<code> on this site. */
export function checkinUrl(code: string): string {
  return `${window.location.origin}/events/checkin/${code}`
}

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)

/**
 * Print the QR on its own page: a new window holding just the title, the
 * code and one line of help, so the app around it never prints.
 */
export function printQr(svgMarkup: string, title: string, when: string): void {
  const win = window.open('', '_blank', 'width=600,height=800')
  if (!win) return window.print()
  win.document.title = `Check in: ${title}`
  win.document.body.innerHTML = `
    <div style="font-family:sans-serif;text-align:center;padding:32px">
      <h1 style="margin:0 0 4px;font-size:28px">${escapeHtml(title)}</h1>
      <p style="margin:0 0 24px;font-size:18px">${escapeHtml(when)}</p>
      <div style="width:420px;height:420px;margin:0 auto">${svgMarkup}</div>
      <p style="margin-top:24px;font-size:22px;font-weight:bold">Scan with your phone camera to check in</p>
    </div>`
  win.document.querySelector('svg')?.setAttribute('style', 'width:100%;height:100%')
  win.focus()
  win.print()
}
