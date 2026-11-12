import type { Cause, CauseStatus } from '@/types/domain'
import type { PillOption } from '@/components/shared'

export function causesWithStatus<T extends Cause>(causes: T[], status: CauseStatus): T[] {
  return causes.filter((cause) => cause.status === status)
}

/** "Open · 4", "Closed · 1"; just "Open", "Closed" until the causes have loaded. */
export function statusPills(causes: Cause[], loaded = true): PillOption<CauseStatus>[] {
  return (['open', 'closed'] as const).map((status) => {
    const name = status === 'open' ? 'Open' : 'Closed'
    return { value: status, label: loaded ? `${name} · ${causesWithStatus(causes, status).length}` : name }
  })
}

/** "Ends 10 Dec" / "Ended 25 Oct" */
export function deadlineLabel(cause: Cause): string {
  if (!cause.deadline) return cause.status === 'open' ? 'No end date' : 'Closed'
  const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(new Date(cause.deadline))
  return `${cause.status === 'open' ? 'Ends' : 'Ended'} ${day}`
}
