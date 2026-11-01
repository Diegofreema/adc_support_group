import { Link } from '@tanstack/react-router'
import { SearchX } from 'lucide-react'

import { buttonClassName, EmptyState } from '@/components/shared'

/** Shown for unknown URLs. */
export function NotFound() {
  return (
    <div className="container py-20">
      <EmptyState icon={SearchX} title="Page not found" action={<Link to="/" className={buttonClassName('secondary')}>Go home</Link>} />
    </div>
  )
}
