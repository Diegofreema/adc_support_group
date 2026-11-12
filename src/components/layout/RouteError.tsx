import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Link, useRouter, type ErrorComponentProps } from '@tanstack/react-router'
import { CloudOff, RotateCw, UsersRound } from 'lucide-react'

import { Button, buttonClassName, EmptyState } from '@/components/shared'

/** groups' NoGroupError, matched by name so the layout needn't import a module. */
function isNoGroup(error: unknown): boolean {
  return error instanceof Error && error.name === 'NoGroupError'
}

/** Route errorComponent: a friendly message and Retry instead of a blank page. */
export function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter()
  const queryReset = useQueryErrorResetBoundary()

  if (isNoGroup(error)) {
    return (
      <div className="container py-20">
        <EmptyState
          icon={UsersRound}
          title="You're not in a group yet"
          action={<Link to="/home" className={buttonClassName('primary')} onClick={reset}>Go to home</Link>}
        />
      </div>
    )
  }

  const retry = () => {
    queryReset.reset()
    reset()
    void router.invalidate()
  }

  return (
    <div className="container py-20">
      <EmptyState
        icon={CloudOff}
        title="Something went wrong loading this page"
        action={(
          <div className="grid justify-items-center gap-2">
            <p className="muted small">Check your connection and try again.</p>
            <Button variant="primary" icon={RotateCw} onClick={retry}>Retry</Button>
          </div>
        )}
      />
    </div>
  )
}
