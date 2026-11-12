import { ChevronLeft, ChevronRight } from 'lucide-react'

import { IconButton } from '@/components/shared'

interface PeriodStepperProps {
  label: string
  canGoBack: boolean
  onBack: () => void
  onNext: () => void
}

/** ‹ Nov 2026 › */
export function PeriodStepper({ label, canGoBack, onBack, onNext }: PeriodStepperProps) {
  return (
    <div className="row-between">
      <IconButton icon={ChevronLeft} label="Previous period" disabled={!canGoBack} onClick={onBack} />
      <span className="h2" aria-live="polite">{label}</span>
      <IconButton icon={ChevronRight} label="Next period" onClick={onNext} />
    </div>
  )
}
