import { useCallback, useState } from 'react'

export interface Wizard {
  step: number
  total: number
  isFirst: boolean
  isLast: boolean
  next: () => void
  back: () => void
  goTo: (step: number) => void
}

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** Step state for multi-step forms. */
export function useWizard(total: number): Wizard {
  const [step, setStep] = useState(0)

  const goTo = useCallback((target: number) => {
    setStep(Math.max(0, Math.min(total - 1, target)))
    scrollToTop()
  }, [total])

  return {
    step,
    total,
    isFirst: step === 0,
    isLast: step === total - 1,
    next: () => goTo(step + 1),
    back: () => goTo(step - 1),
    goTo,
  }
}
