import { Link } from '@tanstack/react-router'

import { Banner } from '@/components/shared'

/** Shown on dues screens while dues are turned off. */
export function DuesOffNote({ canSetDues }: { canSetDues: boolean }) {
  return (
    <Banner tone="info" className="mt-5" title="Dues are off">
      {canSetDues ? <Link to="/money/dues-settings" className="underline">Turn dues on</Link> : 'The leader or treasurer can turn them on.'}
    </Banner>
  )
}
