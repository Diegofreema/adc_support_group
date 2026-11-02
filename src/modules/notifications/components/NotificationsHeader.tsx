import { CheckCheck } from 'lucide-react'

import { Button } from '@/components/shared'

interface NotificationsHeaderProps {
  unread: number
  onMarkRead: () => void
}

export function NotificationsHeader({ unread, onMarkRead }: NotificationsHeaderProps) {
  return (
    <div className="row-between page-head">
      <span className="muted bold">{unread > 0 ? `${unread} new` : 'All caught up'}</span>
      {unread > 0 && <Button variant="ghost" size="sm" icon={CheckCheck} onClick={onMarkRead}>Mark read</Button>}
    </div>
  )
}
