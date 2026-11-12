import type { Power, User } from '@/types/domain'
import type { MemberRecord } from '../types'

/** Display order of the five powers. */
export const ALL_POWERS: readonly Power[] = ['members', 'approvals', 'money', 'messages', 'events']

export const POWER_LABELS: Record<Power, string> = {
  members: 'Members',
  approvals: 'Approvals',
  money: 'Money',
  messages: 'Messages',
  events: 'Events',
}

/** Executives and coordinators hold powers; the leader holds all, members none. */
export function canHoldPowers(member: MemberRecord): boolean {
  return member.role === 'executive' || member.role === 'coordinator'
}

/** Their powers in display order. */
export function sortedPowers(powers: Power[]): Power[] {
  return ALL_POWERS.filter((power) => powers.includes(power))
}

/** The powers the leader ticked on top of the title defaults. */
export function extraPowers(member: MemberRecord): Power[] {
  return member.powers.filter((power) => !member.titlePowers.includes(power))
}

/** Hint next to a default power, e.g. "Comes with Secretary". */
export function defaultPowerHint(member: MemberRecord): string {
  if (member.role === 'coordinator') return 'Comes with Coordinator'
  return `Comes with ${member.title ?? 'their title'}`
}

export interface MemberPermissions {
  canMakeExecutive: boolean
  canMove: boolean
  canEditPowers: boolean
  canRemove: boolean
}

/** What the viewer may do to this member. The backend enforces it; this only hides buttons. */
export function memberPermissions(viewer: User, member: MemberRecord): MemberPermissions {
  const isLeader = viewer.role === 'leader'
  const isSelf = viewer.id === member.id
  return {
    canMakeExecutive: isLeader && member.role === 'member',
    canMove: isLeader && (member.role === 'member' || member.role === 'executive'),
    canEditPowers: isLeader && canHoldPowers(member),
    canRemove: !isSelf && member.role !== 'leader' && (isLeader || member.role === 'member'),
  }
}
