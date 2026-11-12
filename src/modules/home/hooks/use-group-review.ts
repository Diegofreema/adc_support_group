import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { fetchGroupNotice, fetchMyGroupReview, replyToDirectorate } from '../services/home.service'
import { notify } from '@/lib/toast'
import { refreshSessionUser } from '@/modules/auth'
import { useRequiredUser } from '@/stores/session-store'

export const groupReviewQuery = queryOptions({
  queryKey: ['home', 'review'],
  queryFn: fetchMyGroupReview,
  throwOnError: true,
})

/**
 * The waiting page's data. When the Directorate has decided since the
 * session was built (e.g. verified it), refresh the session so the app
 * unlocks (navigation, guards, dashboard).
 */
export function useGroupReview() {
  const user = useRequiredUser()
  const query = useQuery(groupReviewQuery)
  const status = query.data?.status
  useEffect(() => {
    if (status && status !== user.activeGroupStatus) void refreshSessionUser().catch(() => undefined)
  }, [status, user.activeGroupStatus])
  return query
}

export function useReplyToDirectorate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: replyToDirectorate,
    onSuccess: () => {
      notify('Reply sent')
      return queryClient.invalidateQueries({ queryKey: groupReviewQuery.queryKey })
    },
  })
}

export const groupNoticeQuery = queryOptions({
  queryKey: ['home', 'notice'],
  queryFn: fetchGroupNotice,
  throwOnError: true,
})

/** A suspended group's name and reason. */
export function useGroupNotice() {
  return useQuery(groupNoticeQuery)
}
