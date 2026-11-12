import { useEffect } from 'react'

import { startActivityDraftSync } from '@/modules/activities'

/** Sends activities saved offline whenever the signal returns, on any screen. */
export function useDraftSync(enabled: boolean) {
  useEffect(() => (enabled ? startActivityDraftSync() : undefined), [enabled])
}
