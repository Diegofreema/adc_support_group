import qrcode from 'qrcode-generator'
import { useMemo } from 'react'

import { cn } from '@/lib/utils'

/** One SVG path drawing every dark module of the QR code for `value`. */
function qrPath(value: string): { size: number; path: string } {
  const code = qrcode(0, 'M')
  code.addData(value)
  code.make()
  const size = code.getModuleCount()
  let path = ''
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (code.isDark(row, col)) path += `M${col} ${row}h1v1h-1z`
    }
  }
  return { size, path }
}

/** A scannable QR code (e.g. a group or chapter join link). */
export function QrCode({ value, small }: { value: string; small?: boolean }) {
  const { size, path } = useMemo(() => qrPath(value), [value])
  // A quiet zone of 2 modules keeps phone cameras happy.
  return (
    <div className={cn('qr', small && 'qr-sm')} role="img" aria-label={`QR code for ${value}`}>
      <svg viewBox={`-2 -2 ${size + 4} ${size + 4}`} shapeRendering="crispEdges">
        <rect x={-2} y={-2} width={size + 4} height={size + 4} fill="#fff" />
        <path fill="#14181D" d={path} />
      </svg>
    </div>
  )
}
