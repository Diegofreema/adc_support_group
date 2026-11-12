import { useMutation } from '@tanstack/react-query'

import { useDisclosure } from '@/hooks/use-disclosure'
import { notify } from '@/lib/toast'
import { cancelEvent } from '../services/events.service'
import { useEventCache } from './use-event-cache'

/** The cancel dialog and its call. Everyone who said they'd come is told by the backend. */
export function useCancelEvent(id: string) {
  const dialog = useDisclosure()
  const cache = useEventCache()
  const mutation = useMutation({
    mutationFn: (reason: string) => cancelEvent(id, reason),
    onSuccess: (event) => {
      cache.put(event)
      void cache.refreshLists()
      dialog.close()
      notify('Event cancelled')
    },
  })
  return { dialog, cancel: (reason: string) => mutation.mutate(reason), isCancelling: mutation.isPending }
}
