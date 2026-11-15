import { RotateCw, TriangleAlert } from 'lucide-react'

import { Button } from '../actions/Button'
import { IconTile } from './IconTile'
import { friendlyError } from '@/lib/errors'

interface ErrorStateProps {
  title?: string
  error?: unknown
  onRetry: () => void
}

/** A query that failed: say so and offer Retry, instead of loading forever. */
export function ErrorState({ title = 'Could not load this', error, onRetry }: ErrorStateProps) {
  // Plain words only: the server's raw text stays in the console.
  const message = error ? friendlyError(error) : undefined
  return (
    <div className="empty" role="alert">
      <IconTile icon={TriangleAlert} tone="grey" />
      <p className="bold">{title}</p>
      {message && <p className="muted small mt-1 max-w-[36ch] mx-auto">{message}</p>}
      <div className="mt-4"><Button icon={RotateCw} onClick={onRetry}>Try again</Button></div>
    </div>
  )
}
