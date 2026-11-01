import type { LucideIcon } from 'lucide-react'

import { IconTile, List, ListItem, SectionTitle } from '@/components/shared'
import { formatNumber } from '@/lib/format'

export interface MenuLink {
  label: string
  icon: LucideIcon
  to: string
  count?: number
  /** Show the count as an alert (red stamp) instead of a plain number. */
  alert?: boolean
}

export function MenuSection({ title, links }: { title: string; links: MenuLink[] }) {
  return (
    <>
      <SectionTitle title={title} />
      <List>
        {links.map((link) => (
          <ListItem key={link.label} to={link.to} title={link.label} leading={<IconTile icon={link.icon} tone="grey" />} trailing={<MenuCount link={link} />} />
        ))}
      </List>
    </>
  )
}

function MenuCount({ link }: { link: MenuLink }) {
  if (!link.count) return null
  if (link.alert) return <span className="chip chip-rejected">{link.count}</span>
  return <span className="faint small num">{formatNumber(link.count)}</span>
}
