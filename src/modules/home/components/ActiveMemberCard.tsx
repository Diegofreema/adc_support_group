import { Award } from 'lucide-react'

import { Card, IconTile } from '@/components/shared'
import type { ActiveBadge } from '../types/home.types'
import { badgeProgressText } from '../utils/badge-text'

/** The "Active member" badge on a member's home: earned, or a gentle nudge. */
export function ActiveMemberCard({ badge }: { badge: ActiveBadge }) {
  return (
    <Card className="row">
      <IconTile icon={Award} tone={badge.earned ? 'green' : 'grey'} />
      <span className="grow">
        <span className="bold block">{badge.earned ? 'Active member' : 'Active member badge'}</span>
        <span className="tiny muted">
          {badge.earned ? 'Thank you for showing up these last 60 days.' : badgeProgressText(badge)}
        </span>
      </span>
    </Card>
  )
}
