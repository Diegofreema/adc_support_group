import { useMutation } from '@tanstack/react-query'

import { notify } from '@/lib/toast'
import { setRsvp } from '../services/events.service'
import { useEventCache } from './use-event-cache'

/** "I'll come" / "Can't come". `pendingId` is the event being answered. */
export function useEventRsvp() {
  const cache = useEventCache()
  const mutation = useMutation({
    mutationFn: ({ id, coming }: { id: string; coming: boolean }) => setRsvp(id, coming),
    onSuccess: (event) => {
      cache.put(event)
      notify(event.myRsvp ? 'See you there' : 'Okay. We told the organiser you can’t come')
    },
  })
  return {
    answer: (id: string, coming: boolean) => mutation.mutate({ id, coming }),
    pendingId: mutation.isPending ? mutation.variables?.id : undefined,
  }
}
