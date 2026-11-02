import { cn } from '@/lib/utils'

/** Placeholder QR pattern until a real QR generator is wired to the join link. */
const PATTERN =
  'M0 0h7v7H0zM1 1v5h5V1zM2 2h3v3H2zM22 0h7v7h-7zm1 1v5h5V1zm1 1h3v3h-3zM0 22h7v7H0zm1 1v5h5v-5zm1 1h3v3H2zM9 0h2v2H9zm3 1h2v3h-2zm4 0h3v2h-3zm-7 4h3v2H9zm5 1h3v3h-3zm4 2h2v2h-2zM8 9h3v2H8zm5 1h2v3h-2zm4 1h4v2h-4zm6 -2h2v3h-2zm3 2h2v2h-2zM0 9h2v3H0zm3 1h3v2H3zm-3 4h3v2H0zm5 0h4v2H5zm6 2h3v3h-3zm5-1h2v4h-2zm4 0h3v2h-3zm5 1h2v3h-2zM9 20h2v3H9zm4 3h3v2h-3zm5-2h3v2h-3zm4 3h2v3h-2zm3-1h3v2h-3zm-11 4h3v1h-3zm6 0h2v1h-2z'

export function QrCode({ value, small }: { value: string; small?: boolean }) {
  return (
    <div className={cn('qr', small && 'qr-sm')} role="img" aria-label={`QR code for ${value}`}>
      <svg viewBox="0 0 29 29" shapeRendering="crispEdges"><path fill="#14181D" d={PATTERN} /></svg>
    </div>
  )
}
