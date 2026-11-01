export type NotificationKind =
  | 'activity-approved' | 'activity-sent-back' | 'members-joined' | 'payment-received'
  | 'upload-finished' | 'cause-posted' | 'group-verified' | 'handover-approved'

export type NotificationTopic = 'activities' | 'payments' | 'members' | 'group'
export type NotificationFilter = 'all' | Exclude<NotificationTopic, 'group'>
export type NotificationDay = 'today' | 'week'

export interface AppNotification {
  id: string
  kind: NotificationKind
  title: string
  meta: string
  time: string
  day: NotificationDay
  unread: boolean
  to: string
}

export interface NotificationSectionData {
  day: NotificationDay
  title: string
  items: AppNotification[]
}
