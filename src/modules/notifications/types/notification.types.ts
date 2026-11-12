export type NotificationKind =
  | 'activity-approved' | 'activity-sent-back' | 'activity-waiting' | 'members-joined'
  | 'payment-received' | 'payment-rejected' | 'upload-finished' | 'cause-posted'
  | 'group-verified' | 'group-update' | 'handover-approved' | 'message'
  | 'event' | 'event-cancelled'

export type NotificationTopic = 'activities' | 'payments' | 'members' | 'group'
export type NotificationFilter = 'all' | Exclude<NotificationTopic, 'group'>
export type NotificationDay = 'today' | 'week' | 'earlier'

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
