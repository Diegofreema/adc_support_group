import type { AppNotification } from '../types/notification.types'

export const NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', kind: 'activity-approved', title: 'Activity approved', meta: 'Door-to-door, Surulere', time: '9:12', day: 'today', unread: true, to: '/activities' },
  { id: 'n2', kind: 'members-joined', title: '38 joined', meta: 'Via your link', time: '8:40', day: 'today', unread: true, to: '/members' },
  { id: 'n3', kind: 'activity-sent-back', title: 'Activity sent back', meta: 'Prayer rally, Jos · Add headcount', time: '7:05', day: 'today', unread: true, to: '/activities' },
  { id: 'n4', kind: 'payment-received', title: 'Payment received', meta: '₦750,000 · Lagos rally', time: 'Mon', day: 'week', unread: false, to: '/payments' },
  { id: 'n5', kind: 'upload-finished', title: 'Upload finished', meta: '1,268 added · 12 errors', time: 'Sun', day: 'week', unread: false, to: '/members/import' },
  { id: 'n6', kind: 'cause-posted', title: 'New cause', meta: 'Lagos mega rally', time: 'Sat', day: 'week', unread: false, to: '/payments/new' },
  { id: 'n7', kind: 'group-verified', title: 'Group verified', meta: 'Atiku Women Network', time: 'Fri', day: 'week', unread: false, to: '/group' },
  { id: 'n8', kind: 'handover-approved', title: 'Handover approved', meta: 'Kano chapter', time: 'Thu', day: 'week', unread: false, to: '/group' },
]
