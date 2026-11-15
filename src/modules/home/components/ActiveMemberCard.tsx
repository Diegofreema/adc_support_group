import { Award } from 'lucide-react'

import { Card, IconTile, Progress } from '@/components/shared'
import type { ActiveBadge } from '../types/home.types'
import { badgeProgressText } from '../utils/badge-text'

/** The "Active member" badge on a member's home: earned, or a gentle nudge with how close they are. */
export function ActiveMemberCard({ badge }: { badge: ActiveBadge }) {
  return (
    <Card className="mt-4">
      <div className="row">
        <IconTile icon={Award} tone={badge.earned ? 'green' : 'grey'} className={badge.earned ? 'anim-pop' : undefined} />
        <span className="grow">
          <span className="bold block">{badge.earned ? 'You are an active member' : 'Active member badge'}</span>
          <span className="small muted">
            {badge.earned ? 'Thank you for showing up these last 60 days.' : badgeProgressText(badge)}
          </span>
        </span>
      </div>
      {!badge.earned && <div className="mt-3"><Progress value={Number.isFinite(badge.progress) ? Math.round(badge.progress * 100) : 0} small label="Progress to the badge" /></div>}
    </Card>
  )
}
