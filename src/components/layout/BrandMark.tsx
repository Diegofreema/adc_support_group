import { Link } from '@tanstack/react-router'

interface BrandMarkProps {
  to?: string
  /** Show the product name next to the mark. */
  withName?: boolean
  subtitle?: string
}

export function BrandMark({ to = '/', withName = true, subtitle }: BrandMarkProps) {
  return (
    <Link to={to} className="brand" aria-label="ADC Support Groups home">
      <span className="brand-mark"><b>ADC</b></span>
      {withName && (
        <span className="brand-name">
          Support Groups
          {subtitle && <small>{subtitle}</small>}
        </span>
      )}
    </Link>
  )
}
