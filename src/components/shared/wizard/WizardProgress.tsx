interface WizardProgressProps {
  step: number
  total: number
}

/** "STEP 2 OF 4" + segmented bar. `step` is zero-based. */
export function WizardProgress({ step, total }: WizardProgressProps) {
  return (
    <div>
      <span className="step-count">Step {step + 1} of {total}</span>
      <div className="stepper mt-2" aria-hidden>
        {Array.from({ length: total }, (_, index) => (
          <span key={index} className={index < step ? 'done' : index === step ? 'now' : ''} />
        ))}
      </div>
    </div>
  )
}
