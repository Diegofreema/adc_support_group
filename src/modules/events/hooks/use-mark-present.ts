import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query'

import { setAttendance } from '../services/attendance.service'
import { eventKeys } from '../utils/event-keys'
import type { AttendancePage, GroupEvent } from '../types'

interface Mark {
  profileId: string
  present: boolean
}

/** Flip one person in every loaded page and move the present count with them. */
const applyMark = ({ profileId, present }: Mark) => (data: InfiniteData<AttendancePage> | undefined) => {
  if (!data) return data
  const was = data.pages.some((page) => page.rows.some((row) => row.profileId === profileId && row.present === present))
  if (was) return data
  const step = present ? 1 : -1
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      presentCount: page.presentCount + step,
      rows: page.rows.map((row) => (row.profileId === profileId ? { ...row, present, via: present ? row.via ?? 'ticked' : undefined } : row)),
    })),
  }
}

/** Tick a box: shown at once, sent in the background, put back if the backend refuses. */
export function useMarkPresent(eventId: string) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (mark: Mark) => setAttendance(eventId, mark.profileId, mark.present),
    onMutate: (mark) => {
      queryClient.setQueriesData<InfiniteData<AttendancePage>>({ queryKey: eventKeys.attendanceAll(eventId) }, applyMark(mark))
      queryClient.setQueryData<GroupEvent>(eventKeys.detail(eventId), (event) => event && { ...event, presentCount: Math.max(0, event.presentCount + (mark.present ? 1 : -1)) })
    },
    onError: () => queryClient.invalidateQueries({ queryKey: eventKeys.attendanceAll(eventId) }),
    // Other filters' lists may now be missing (or still hold) this person: refetch them when next shown, not now.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: eventKeys.attendanceAll(eventId), refetchType: 'none' }),
  })
  return (profileId: string, present: boolean) => mutation.mutate({ profileId, present })
}
