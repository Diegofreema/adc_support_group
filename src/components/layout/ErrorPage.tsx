import { House, RefreshCw, RotateCw } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button, buttonClassName, IconTile } from '@/components/shared'
import { describeError, errorReference } from './error-kind'
import { StatusLayout } from './StatusLayout'

interface ErrorPageProps {
  error: unknown
  /** Try the failed page again without a full reload (router errors only). */
  onRetry?: () => void
  /** Where "home" is for this person ('/' when unknown). */
  homePath?: string
}

/** Whole-page error: what happened, a reference to quote, and ways out. */
export function ErrorPage({ error, onRetry, homePath = '/' }: ErrorPageProps) {
  const [reference] = useState(errorReference)
  const what = describeError(error)

  useEffect(() => {
    console.error(`[${reference}]`, error)
  }, [reference, error])

  const reload = () => window.location.reload()
  return (
    <StatusLayout headline={<>Something broke.<br /><span>It's not you.</span></>}>
      <IconTile icon={what.kind === 'update' ? RefreshCw : RotateCw} className="mb-4" />
      <p className="eyebrow">{what.kind === 'update' ? 'Update' : 'Error'} · <span className="mono">{reference}</span></p>
      <h1 className="h1 mt-2">{what.title}</h1>
      <p className="muted mt-1">{what.helper}</p>
      <div className="mt-6 grid gap-2">
        {what.kind === 'update' || !onRetry
          ? <Button variant="primary" size="lg" block icon={RefreshCw} onClick={reload}>Reload</Button>
          : <Button variant="primary" size="lg" block icon={RotateCw} onClick={onRetry}>Try again</Button>}
        <a href={homePath} className={buttonClassName('secondary', 'lg', true)}><House className="i" aria-hidden />Go to home</a>
      </div>
      {import.meta.env.DEV && error instanceof Error && (
        <details className="mt-6 small muted">
          <summary>Details (development only)</summary>
          <pre className="mono mt-2 whitespace-pre-wrap break-words">{error.stack ?? error.message}</pre>
        </details>
      )}
    </StatusLayout>
  )
}
