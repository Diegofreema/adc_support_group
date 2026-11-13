import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useRouter, type ErrorComponentProps } from '@tanstack/react-router'

import { homePathFor } from '@/modules/auth'
import { useSessionUser } from '@/stores/session-store'
import { ErrorPage } from './ErrorPage'

/** Root route errorComponent: errors outside the signed-in frame get the full error page. */
export function RootError({ error, reset }: ErrorComponentProps) {
  const router = useRouter()
  const queryReset = useQueryErrorResetBoundary()
  const user = useSessionUser()
  const retry = () => {
    queryReset.reset()
    reset()
    void router.invalidate()
  }
  return <ErrorPage error={error} onRetry={retry} homePath={user ? homePathFor(user) : '/'} />
}
