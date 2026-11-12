import { formatDay, formatNaira } from '@/lib/format'
import type { GroupAuditEntry } from '../types'

type Details = Record<string, unknown>

const text = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')
const quoted = (value: unknown): string => (text(value) ? ` '${text(value)}'` : '')
const plural = (count: number, word: string): string => `${count} ${word}${count === 1 ? '' : 's'}`

const JOIN_ROUTE: Record<string, string> = {
  link: 'through the join link',
  excel: 'from a spreadsheet',
  manual: 'by hand',
  request: 'from join requests',
}

function roleSet(details: Details): string {
  const title = text(details.title)
  if (details.role === 'coordinator') return 'made a member a chapter coordinator'
  if (details.role === 'executive') return title ? `made a member ${title}` : 'made a member an executive'
  return 'made someone a plain member'
}

function powersSet(details: Details): string {
  const count = Array.isArray(details.powers) ? details.powers.length : 0
  return count ? `changed a member's powers (${plural(count, 'power')})` : "took away a member's extra powers"
}

function membersAdded(details: Details): string {
  const count = Number(details.count) || 0
  const route = JOIN_ROUTE[text(details.via)]
  return `added ${plural(count, 'member')}${route ? ` ${route}` : ''}`
}

function chapterUpdated(details: Details): string {
  const name = text(details.name)
  const old = text(details.old_name)
  return old && name && old !== name ? `renamed chapter '${old}' to '${name}'` : `updated chapter${quoted(name)}`
}

function withReason(verb: string, details: Details): string {
  const reason = text(details.reason)
  return reason ? `${verb}: "${reason}"` : verb
}

function memberLeft(details: Details): string {
  return details.reason === 'details_deleted' ? 'left the group and had their details deleted' : 'left the group'
}

/** What the actor did, as a verb phrase ("removed a member"). */
const PHRASES: Record<string, (details: Details) => string> = {
  support_group_member_removed: () => 'removed a member',
  support_group_member_blocked: () => 'removed and blocked a member',
  support_group_member_left: memberLeft,
  support_group_member_role_set: roleSet,
  support_group_member_powers_set: powersSet,
  support_group_members_added: membersAdded,
  support_group_join_code_replaced: () => 'replaced the join code',
  support_group_chapter_created: (details) => `created chapter${quoted(details.name)}`,
  support_group_chapter_updated: chapterUpdated,
  support_group_chapter_archived: (details) => `archived chapter${quoted(details.name)}`,
  support_group_activity_approved: () => 'approved an activity',
  support_group_activity_sent_back: (details) => withReason('sent an activity back', details),
  support_group_activity_checked: () => 'checked an activity',
  support_group_activity_rejected: (details) => withReason('rejected an activity', details),
  support_group_payment_recorded: (details) => (Number(details.amount) ? `recorded a payment of ${formatNaira(Number(details.amount))}` : 'recorded a payment'),
  support_group_payment_confirmed: () => 'confirmed a payment',
  support_group_payment_rejected: (details) => withReason('rejected a payment', details),
  support_group_handover_approved: () => 'approved a leader handover',
  support_group_handover_declined: () => 'declined a leader handover',
  support_group_verified: () => 'verified the group',
  support_group_rejected: (details) => withReason('rejected the group', details),
  support_group_suspended: (details) => withReason('suspended the group', details),
  support_group_edited: () => 'edited the group details',
  support_group_resubmitted: () => 'resubmitted the group for review',
  support_group_info_requested: () => 'asked the leader for more information',
  support_group_info_replied: () => 'replied to the Directorate',
  support_group_leader_appointed: () => 'appointed a leader',
  support_group_leader_revoked: () => 'removed the leader',
}

/** "support_group_cause_saved" → "cause saved", for codes without a phrase. */
export function humaniseAction(action: string): string {
  return action.replace(/^support_group_/, '').replaceAll('_', ' ')
}

/** "Ada (Directorate)" for staff, otherwise just the name. */
function actorLabel(entry: GroupAuditEntry): string {
  return entry.actorIsStaff ? `${entry.actorName} (Directorate)` : entry.actorName
}

/** One plain-English line, e.g. "Ada removed a member". */
export function auditLine(entry: GroupAuditEntry): string {
  const phrase = PHRASES[entry.action]
  if (phrase) return `${actorLabel(entry)} ${phrase(entry.details)}`
  return `${actorLabel(entry)}: ${humaniseAction(entry.action)}`
}

/** "Just now", "14:05", "Yesterday", "3 days ago", then "31 Oct". */
export function shortWhen(iso: string, now: Date = new Date()): string {
  const date = new Date(iso)
  const minutes = Math.floor((now.getTime() - date.getTime()) / 60_000)
  if (minutes < 1) return 'Just now'
  if (date.toDateString() === now.toDateString()) return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  const days = Math.max(1, Math.round(minutes / 1440))
  if (days === 1) return 'Yesterday'
  return days < 7 ? `${days} days ago` : formatDay(iso)
}
