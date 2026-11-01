import { Link } from '@tanstack/react-router'

import { IconTile } from '@/components/shared'
import { cn } from '@/lib/utils'
import type { AppNotification } from '../types/notification.types'
import { notificationStyle } from '../utils/notification-style'

/** One alert row; unread rows are tinted and marked. */
export function NotificationItem({ item }: { item: AppNotification }) {
  const style = notificationStyle(item.kind)
  return (
    <Link to={item.to} className={cn('list-item', item.unread && 'bg-primary-soft')}>
      <IconTile icon={style.icon} tone={style.tone} />
      <span className="grow">
        <span className="title block">
          {item.title}
          {item.unread && <span className="ml-2 inline-block size-2 rounded-[1px] bg-primary align-middle" aria-label="New" />}
        </span>
        <span className="meta block">{item.meta}</span>
      </span>
      <span className="flex-none self-start pt-0.5 text-xs text-muted-foreground">{item.time}</span>
    </Link>
  )
}
