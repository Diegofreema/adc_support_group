import { toast } from 'sonner'

/** Single place for user-facing toasts so wording and style stay consistent. */
export function notify(message: string, kind: 'success' | 'error' = 'success'): void {
  if (kind === 'error') toast.error(message)
  else toast.success(message)
}
