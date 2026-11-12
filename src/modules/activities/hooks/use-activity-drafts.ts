import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { syncActivityDrafts } from '../services/activity-draft-sync'
import { myDrafts, removeDraft, sendDraft } from '../services/activity-drafts.service'
import { activityKeys } from '../utils/activity-keys'
import { notify } from '@/lib/toast'
import { useRequiredUser } from '@/stores/session-store'

/** Activities saved on this phone, waiting for signal. Sends them once when the screen opens. */
export function useActivityDrafts() {
  const user = useRequiredUser()
  const queryClient = useQueryClient()
  const drafts = useQuery({ queryKey: activityKeys.drafts(user.id), queryFn: myDrafts, staleTime: 0, networkMode: 'always' })
  const [deleting, setDeleting] = useState<string>()

  useEffect(() => { void syncActivityDrafts() }, [])

  const send = useMutation({
    mutationFn: sendDraft,
    networkMode: 'always',
    onSuccess: (sent) => {
      notify(sent ? 'Sent' : 'Not sent yet', sent ? 'success' : 'error')
      return queryClient.invalidateQueries({ queryKey: sent ? activityKeys.all : activityKeys.drafts(user.id) })
    },
  })
  const remove = useMutation({
    mutationFn: removeDraft,
    networkMode: 'always',
    onSuccess: () => queryClient.invalidateQueries({ queryKey: activityKeys.drafts(user.id) }),
  })

  return {
    drafts: drafts.data ?? [],
    sendNow: (clientRef: string) => send.mutate(clientRef),
    sendingRef: send.isPending ? send.variables : undefined,
    deleting,
    startDelete: setDeleting,
    closeDelete: (open: boolean) => { if (!open) setDeleting(undefined) },
    confirmDelete: () => { if (deleting) remove.mutate(deleting); setDeleting(undefined) },
  }
}
