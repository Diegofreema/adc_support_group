import { BadgeCheck, Check, CirclePause, CircleX, Clock, Lock, Receipt, type LucideIcon } from 'lucide-react'

import type { Status } from '@/types/domain'

interface ChipStyle {
  className: string
  icon: LucideIcon
  label: string
}

const STATUS_STYLES: Record<Status, ChipStyle> = {
  verified: { className: 'chip-verified', icon: BadgeCheck, label: 'Verified' },
  pending: { className: 'chip-pending', icon: Clock, label: 'Waiting' },
  rejected: { className: 'chip-rejected', icon: CircleX, label: 'Rejected' },
  suspended: { className: 'chip-suspended', icon: CirclePause, label: 'Suspended' },
  approved: { className: 'chip-approved', icon: Check, label: 'Approved' },
  paid: { className: 'chip-paid', icon: Receipt, label: 'Paid' },
  checking: { className: 'chip-pending', icon: Clock, label: 'Checking' },
  failed: { className: 'chip-failed', icon: CircleX, label: 'Failed' },
  open: { className: 'chip-approved', icon: Check, label: 'Open' },
  closed: { className: 'chip-neutral', icon: Lock, label: 'Closed' },
}

interface StatusChipProps {
  status: Status
  /** Override the default word (e.g. "Sent back"). */
  label?: string
}

/** Status stamp: always icon + word, never colour alone. */
export function StatusChip({ status, label }: StatusChipProps) {
  const style = STATUS_STYLES[status]
  return (
    <span className={`chip ${style.className}`}>
      <style.icon className="i" aria-hidden />
      {label ?? style.label}
    </span>
  )
}
