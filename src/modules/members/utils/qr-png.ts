/** "Lagos Youth · Ikeja" → "lagos-youth-ikeja-qr.png" */
export function qrFileName(name: string): string {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return `${slug || 'join'}-qr.png`
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Could not draw the QR code'))
    image.src = src
  })
}

/** Draw an on-screen QR <svg> onto a white canvas and save it as a PNG. */
export async function downloadSvgAsPng(svg: SVGSVGElement, fileName: string, size = 1024): Promise<void> {
  const clone = svg.cloneNode(true) as SVGSVGElement
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  clone.setAttribute('width', String(size))
  clone.setAttribute('height', String(size))
  const svgUrl = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' }))
  try {
    const image = await loadImage(svgUrl)
    const margin = Math.round(size / 12)
    const canvas = document.createElement('canvas')
    canvas.width = size + margin * 2
    canvas.height = size + margin * 2
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not draw the QR code')
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.imageSmoothingEnabled = false
    context.drawImage(image, margin, margin, size, size)
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = fileName
    link.click()
  } finally {
    URL.revokeObjectURL(svgUrl)
  }
}
