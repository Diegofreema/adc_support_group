import { toast } from 'sonner'

import { friendlyError } from './errors'

/** Single place for user-facing toasts so wording and style stay consistent. */
export function notify(message: string, kind: 'success' | 'error' = 'success'): void {
  // Error text often comes straight from the server: show it in plain words only.
  if (kind === 'error') toast.error(friendlyError(message))
  else toast.success(message)
}
