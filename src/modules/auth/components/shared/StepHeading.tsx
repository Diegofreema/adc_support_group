import type { ReactNode } from 'react'

/** Wizard step title with an optional one-line helper. */
export function StepHeading({ title, helper }: { title: string; helper?: ReactNode }) {
  return (
    <>
      <h1 className="h1">{title}</h1>
      {helper && <p className="muted mt-1">{helper}</p>}
    </>
  )
}
