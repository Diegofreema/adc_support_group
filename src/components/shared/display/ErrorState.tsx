import { RotateCw, TriangleAlert } from 'lucide-react'

import { Button } from '../actions/Button'
import { IconTile } from './IconTile'

interface ErrorStateProps {
  title?: string
  error?: unknown
  onRetry: () => void
}

/** A query that failed: say so and offer Retry, instead of loading forever. */
export function ErrorState({ title = 'Could not load this', error, onRetry }: ErrorStateProps) {
  const message = error instanceof Error ? error.message : undefined
  return (
    <div className="empty" role="alert">
      <IconTile icon={TriangleAlert} tone="grey" />
      <p className="bold">{title}</p>
      {message && <p className="faint small mt-1">{message}</p>}
      <div className="mt-4"><Button icon={RotateCw} onClick={onRetry}>Retry</Button></div>
    </div>
  )
}
