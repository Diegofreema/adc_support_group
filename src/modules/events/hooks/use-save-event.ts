import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { notify } from '@/lib/toast'
import { createEvent, updateEvent } from '../services/events.service'
import type { EventInput, GroupEvent } from '../types'
import { useEventCache } from './use-event-cache'

/** Create (no id) or update an event, then open it. */
export function useSaveEvent(id?: string) {
  const cache = useEventCache()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (input: EventInput) => (id ? updateEvent(id, input) : createEvent(input)),
    meta: { inlineError: true },
    onSuccess: async (event: GroupEvent) => {
      cache.put(event)
      void cache.refreshLists()
      notify(id ? 'Saved' : 'Event added')
      await navigate({ to: '/events/$eventId', params: { eventId: event.id }, replace: true })
    },
  })
}
