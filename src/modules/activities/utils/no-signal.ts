/** Browser wording for a fetch that never reached the server (Chrome, Firefox, Safari, Node). */
const NETWORK_FAILURE = /failed to fetch|networkerror|network request failed|load failed|fetch failed|network connection was lost/i

/** True when the phone is offline or the request died on the network, not when the server said no. */
export function isNoSignal(error: unknown): boolean {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return true
  const message = error instanceof Error ? error.message : String(error)
  return NETWORK_FAILURE.test(message)
}

/** Storage name of a draft's n-th photo: stable, so a re-send finds the photo already there. */
export const draftPhotoId = (clientRef: string, index: number) => `${clientRef}-${index + 1}`
