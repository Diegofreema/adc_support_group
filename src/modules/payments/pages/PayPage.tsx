import { CreditCard } from 'lucide-react'

import { PendingGroupNote, WizardActions, WizardProgress } from '@/components/shared'
import { useGroupLocked } from '@/hooks/use-group-verified'
import { AmountStep } from '../components/AmountStep'
import { PayCheckStep } from '../components/PayCheckStep'
import { PayForStep } from '../components/PayForStep'
import { usePayWizard } from '../hooks/use-pay-wizard'

type Flow = ReturnType<typeof usePayWizard>

export function PayPage() {
  const locked = useGroupLocked()
  if (locked) {
    return (
      <div className="main-narrow mx-auto">
        <h1 className="h1">Pay</h1>
        <PendingGroupNote className="mt-5" />
      </div>
    )
  }
  return <PayWizard />
}

function PayWizard() {
  const flow = usePayWizard()
  return (
    <div className="main-narrow mx-auto">
      <WizardProgress step={flow.wizard.step} total={flow.wizard.total} />
      <section className="mt-6"><CurrentStep flow={flow} /></section>
      <StepActions flow={flow} />
    </div>
  )
}

function CurrentStep({ flow }: { flow: Flow }) {
  const { draft, lookups, update } = flow
  switch (flow.wizard.step) {
    case 0: return <PayForStep draft={draft} causes={lookups.causes} onChange={update} />
    case 1: return <AmountStep draft={draft} activities={lookups.activities} chapters={lookups.chapters} defaultChapterLabel={lookups.defaultChapterLabel} onChange={update} />
    default: return <PayCheckStep summary={flow.summary()} />
  }
}

function StepActions({ flow }: { flow: Flow }) {
  const { wizard } = flow
  const onBack = wizard.isFirst ? undefined : wizard.back
  if (wizard.isLast) return <WizardActions onBack={onBack} onNext={flow.submit} nextLabel="Pay with Funz" nextIcon={CreditCard} loading={flow.isPaying} />
  return <WizardActions onBack={onBack} onNext={flow.next} />
}
