import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/shared'
import { ActionBar } from '@/components/layout/ActionBar'

interface StepFooterProps {
  label: string
  onNext: () => void
  onBack?: () => void
  disabled?: boolean
}

/**
 * Wizard footer that can be disabled without showing "Please wait…".
 * (Shared WizardActions has no `disabled` prop yet.)
 */
export function StepFooter({ label, onNext, onBack, disabled }: StepFooterProps) {
  return (
    <ActionBar>
      <div className="row">
        {onBack && <Button size="lg" icon={ArrowLeft} aria-label="Back" onClick={onBack} />}
        <Button variant="primary" size="lg" block className="grow" disabled={disabled} onClick={onNext}>{label}</Button>
      </div>
    </ActionBar>
  )
}
