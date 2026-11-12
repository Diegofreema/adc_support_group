import { Trophy } from 'lucide-react'

import { Card, IconTile, ListItem } from '@/components/shared'
import { useMyStanding } from '../hooks/use-my-standing'

/** Home line: "#3 in Lagos for activities" / "#5 for people reached", linking to the board. Hidden when not ranked. */
export function LeaderboardSnippet({ className }: { className?: string }) {
  const standing = useMyStanding()
  if (!standing) return null
  const people = standing.peoplePlace ? `#${standing.peoplePlace} for people reached` : undefined
  return (
    <Card flush className={className}>
      <ListItem
        to="/leaderboard"
        leading={<IconTile icon={Trophy} />}
        title={`#${standing.activitiesPlace} ${standing.boardPhrase} for activities`}
        meta={people}
      />
    </Card>
  )
}
