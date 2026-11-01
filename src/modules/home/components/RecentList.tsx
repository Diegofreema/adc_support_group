import { Link } from '@tanstack/react-router'
import { HandCoins } from 'lucide-react'

import { IconTile, List, ListItem, SectionTitle, StatusChip } from '@/components/shared'
import { formatNairaShort } from '@/lib/format'
import type { RecentItem } from '../types/home.types'
import { activityTypeIcon } from '@/config/activity-types'

export function RecentList({ items }: { items: RecentItem[] }) {
  return (
    <>
      <SectionTitle title="Recent" action={<Link to="/activities">See all</Link>} />
      <List>
        {items.map((item) => (
          <RecentRow key={item.id} item={item} />
        ))}
      </List>
    </>
  )
}

function RecentRow({ item }: { item: RecentItem }) {
  if (item.kind === 'payment') {
    return <ListItem to={item.to} title={item.title} meta={item.meta} leading={<IconTile icon={HandCoins} tone="red" />} trailing={<span className="amount">{formatNairaShort(item.amount)}</span>} />
  }
  return <ListItem to={item.to} title={item.title} meta={item.meta} leading={<IconTile icon={activityTypeIcon(item.activityType)} />} trailing={<StatusChip status={item.status} />} />
}
