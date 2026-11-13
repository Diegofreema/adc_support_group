import { Link } from '@tanstack/react-router'
import { ChevronRight, Flag } from 'lucide-react'

import { IconTile } from '@/components/shared'

/** The other way in: lead your own group (the register wizard skips the account step). */
export function StartGroupCard() {
  return (
    <Link
      to="/register"
      className="card flex items-center gap-3.5 transition-colors hover:border-line-strong hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-ring"
    >
      <IconTile icon={Flag} tone="grey" />
      <span className="grow">
        <span className="h3 block text-foreground">Start a group</span>
        <span className="small muted mt-0.5 block">Lead your own. The Directorate checks it in 1–3 days.</span>
      </span>
      <ChevronRight className="i shrink-0 text-muted-foreground" aria-hidden />
    </Link>
  )
}
