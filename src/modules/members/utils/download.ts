/** Save text as a file in the browser. */
export function downloadText(fileName: string, text: string, type = 'text/csv'): void {
  const url = URL.createObjectURL(new Blob([text], { type }))
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}
