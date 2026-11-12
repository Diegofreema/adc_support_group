import { formatDay, formatNaira, countLabel } from '@/lib/format'
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

/** The person acted on, or a stand-in when the backend couldn't name them. */
const person = (target: string, fallback = 'a member'): string => target || fallback
const possessive = (target: string): string => (target ? `${target}'s` : "a member's")
/** An activity by its title in quotes, or a stand-in. */
const activity = (target: string): string => (target ? `'${target}'` : 'an activity')

function roleSet(details: Details, target: string): string {
  const title = text(details.title)
  const who = person(target)
  if (details.role === 'coordinator') return `made ${who} a chapter coordinator`
  if (details.role === 'executive') return title ? `made ${who} ${title}` : `made ${who} an executive`
  return `made ${person(target, 'someone')} a plain member`
}

function powersSet(details: Details, target: string): string {
  const count = Array.isArray(details.powers) ? details.powers.length : 0
  return count ? `changed ${possessive(target)} powers (${plural(count, 'power')})` : `took away ${possessive(target)} extra powers`
}

function membersAdded(details: Details): string {
  const count = Number(details.count) || 0
  const route = JOIN_ROUTE[text(details.via)]
  return `added ${plural(count, 'member')}${route ? ` ${route}` : ''}`
}

/** The chapter's name from the log, else the backend's name for it today. */
const chapterName = (details: Details, target: string): string => quoted(text(details.name) || target)

function chapterUpdated(details: Details, target: string): string {
  const name = text(details.name)
  const old = text(details.old_name)
  return old && name && old !== name ? `renamed chapter '${old}' to '${name}'` : `updated chapter${chapterName(details, target)}`
}

function withReason(verb: string, details: Details): string {
  const reason = text(details.reason)
  return reason ? `${verb}: "${reason}"` : verb
}

function memberLeft(details: Details): string {
  return details.reason === 'details_deleted' ? 'left the group and had their details deleted' : 'left the group'
}

type Phrase = (details: Details, target: string) => string

/** What the actor did, as a verb phrase ("removed Bola"). `target` is who or what was acted on ('' when unknown). */
const PHRASES: Record<string, Phrase> = {
  support_group_member_removed: (_, target) => `removed ${person(target)}`,
  support_group_member_blocked: (_, target) => `removed and blocked ${person(target)}`,
  support_group_member_left: memberLeft,
  support_group_member_role_set: roleSet,
  support_group_member_powers_set: powersSet,
  support_group_members_added: membersAdded,
  support_group_join_code_replaced: () => 'replaced the join code',
  support_group_chapter_created: (details, target) => `created chapter${chapterName(details, target)}`,
  support_group_chapter_updated: chapterUpdated,
  support_group_chapter_archived: (details, target) => `archived chapter${chapterName(details, target)}`,
  support_group_activity_approved: (_, target) => `approved ${activity(target)}`,
  support_group_activity_sent_back: (details, target) => withReason(`sent ${activity(target)} back`, details),
  support_group_activity_checked: (_, target) => `checked ${activity(target)}`,
  support_group_activity_rejected: (details, target) => withReason(`rejected ${activity(target)}`, details),
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
  support_group_leader_appointed: (_, target) => (target ? `appointed ${target} as leader` : 'appointed a leader'),
  support_group_leader_revoked: (_, target) => (target ? `removed ${target} as leader` : 'removed the leader'),
}

/** "support_group_cause_saved" → "cause saved", for codes without a phrase. */
export function humaniseAction(action: string): string {
  return action.replace(/^support_group_/, '').replaceAll('_', ' ')
}

/** "Ada (Directorate)" for staff, "Secretary Ada" when they hold a title, otherwise just the name. */
function actorLabel(entry: GroupAuditEntry): string {
  if (entry.actorIsStaff) return `${entry.actorName} (Directorate)`
  return entry.actorTitle ? `${entry.actorTitle} ${entry.actorName}` : entry.actorName
}

/** One plain-English line, e.g. "Secretary Ada removed Bola". */
export function auditLine(entry: GroupAuditEntry): string {
  const phrase = PHRASES[entry.action]
  if (phrase) return `${actorLabel(entry)} ${phrase(entry.details, text(entry.targetName))}`
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
  return days < 7 ? `${countLabel(days, 'day', 'days')} ago` : formatDay(iso)
}
