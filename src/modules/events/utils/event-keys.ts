import type { AttendanceFilter, EventWhen } from '../types'

/** Query keys; everything sits under `all`, so one invalidation refreshes every event screen. */
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (groupId: string, when: EventWhen) => [...eventKeys.lists(), groupId, when] as const,
  detail: (id: string) => [...eventKeys.all, 'detail', id] as const,
  attendanceAll: (id: string) => [...eventKeys.all, 'attendance', id] as const,
  attendance: (id: string, filter: AttendanceFilter, search: string) => [...eventKeys.attendanceAll(id), filter, search] as const,
  types: () => [...eventKeys.all, 'types'] as const,
  chapters: () => [...eventKeys.all, 'chapters'] as const,
}
