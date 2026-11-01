import { BadgeCheck, Check, FileSpreadsheet, Receipt, Repeat, Target, Undo2, UserPlus, type LucideIcon } from 'lucide-react'

import type { Tone } from '@/components/shared'
import type { NotificationKind, NotificationTopic } from '../types/notification.types'

interface KindStyle {
  icon: LucideIcon
  tone: Tone
  topic: NotificationTopic
}

const KIND_STYLES: Record<NotificationKind, KindStyle> = {
  'activity-approved': { icon: Check, tone: 'green', topic: 'activities' },
  'activity-sent-back': { icon: Undo2, tone: 'red', topic: 'activities' },
  'members-joined': { icon: UserPlus, tone: 'blue', topic: 'members' },
  'payment-received': { icon: Receipt, tone: 'green', topic: 'payments' },
  'upload-finished': { icon: FileSpreadsheet, tone: 'amber', topic: 'members' },
  'cause-posted': { icon: Target, tone: 'blue', topic: 'payments' },
  'group-verified': { icon: BadgeCheck, tone: 'green', topic: 'group' },
  'handover-approved': { icon: Repeat, tone: 'grey', topic: 'group' },
}

export function notificationStyle(kind: NotificationKind): KindStyle {
  return KIND_STYLES[kind]
}
