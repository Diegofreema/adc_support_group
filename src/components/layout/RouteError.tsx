import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Link, useRouter, type ErrorComponentProps } from '@tanstack/react-router'
import { CloudOff, RotateCw, UsersRound } from 'lucide-react'

import { Button, buttonClassName, EmptyState } from '@/components/shared'
import { describeError } from './error-kind'

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

  const what = describeError(error)
  return (
    <div className="container py-20">
      <EmptyState
        icon={CloudOff}
        title={what.kind === 'unknown' ? 'Something went wrong loading this page' : what.title}
        action={(
          <div className="grid justify-items-center gap-2">
            <p className="muted small">{what.kind === 'unknown' ? 'Check your connection and try again.' : what.helper}</p>
            {what.kind === 'update'
              ? <Button variant="primary" icon={RotateCw} onClick={() => window.location.reload()}>Reload</Button>
              : <Button variant="primary" icon={RotateCw} onClick={retry}>Retry</Button>}
          </div>
        )}
      />
    </div>
  )
}
