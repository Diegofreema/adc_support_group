import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { checkIn } from '../services/events.service'
import { currentPoint, QUICK_FIX } from '../utils/geolocation'
import { useEventCache } from './use-event-cache'

/** Ask for the position quietly (8s at most, never required), then check in. */
async function checkInHere(code: string) {
  return checkIn(code, await currentPoint(QUICK_FIX))
}

/** Checks in as soon as the QR page opens; `retry` tries again. */
export function useCheckIn(code: string) {
  const cache = useEventCache()
  const mutation = useMutation({
    mutationFn: () => checkInHere(code),
    meta: { inlineError: true },
    onSuccess: (event) => cache.put(event),
  })
  const started = useRef(false)
  const { mutate } = mutation

  useEffect(() => {
    if (started.current) return
    started.current = true
    mutate()
  }, [mutate])

  return { event: mutation.data, error: mutation.error, isPending: !mutation.data && !mutation.error, retry: () => mutation.mutate() }
}
