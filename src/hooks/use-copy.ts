import { notify } from '@/lib/toast'

/** Copy text and confirm with a toast. */
export function useCopy(): (text: string, message?: string) => Promise<void> {
  return async (text, message = 'Copied') => {
    try {
      await navigator.clipboard.writeText(text)
      notify(message)
    } catch {
      notify('Could not copy', 'error')
    }
  }
}
