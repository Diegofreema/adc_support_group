import { ArrowLeft, type LucideIcon } from 'lucide-react'

import { Button } from '../actions/Button'
import { ActionBar } from '@/components/layout/ActionBar'

interface WizardActionsProps {
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  nextIcon?: LucideIcon
  /** Submit the surrounding form instead of calling onNext. */
  submit?: boolean
  loading?: boolean
}

/** Sticky footer: back arrow + the one primary action. */
export function WizardActions({ onBack, onNext, nextLabel = 'Next', nextIcon, submit, loading }: WizardActionsProps) {
  return (
    <ActionBar>
      <div className="row">
        {onBack && <Button size="lg" icon={ArrowLeft} aria-label="Back" onClick={onBack} />}
        <Button variant="primary" size="lg" block className="grow" icon={nextIcon} type={submit ? 'submit' : 'button'} onClick={submit ? undefined : onNext} disabled={loading}>
          {loading ? 'Please wait…' : nextLabel}
        </Button>
      </div>
    </ActionBar>
  )
}
