import type { Cause, CauseStatus } from '@/types/domain'
import type { PillOption } from '@/components/shared'

export function causesWithStatus(causes: Cause[], status: CauseStatus): Cause[] {
  return causes.filter((cause) => cause.status === status)
}

/** "Open · 4", "Closed · 1" */
export function statusPills(causes: Cause[]): PillOption<CauseStatus>[] {
  return (['open', 'closed'] as const).map((status) => ({
    value: status,
    label: `${status === 'open' ? 'Open' : 'Closed'} · ${causesWithStatus(causes, status).length}`,
  }))
}

/** "Ends 10 Dec" / "Ended 25 Oct" */
export function deadlineLabel(cause: Cause): string {
  const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(new Date(cause.deadline))
  return `${cause.status === 'open' ? 'Ends' : 'Ended'} ${day}`
}
