import { CreditCard } from 'lucide-react'

import { WizardActions, WizardProgress } from '@/components/shared'
import { AmountStep } from '../components/AmountStep'
import { PayCheckStep } from '../components/PayCheckStep'
import { PayerStep } from '../components/PayerStep'
import { PayForStep } from '../components/PayForStep'
import { PaymentSuccessDialog } from '../components/PaymentSuccessDialog'
import { usePayWizard } from '../hooks/use-pay-wizard'

type Flow = ReturnType<typeof usePayWizard>

export function PayPage() {
  const flow = usePayWizard()
  return (
    <div className="main-narrow mx-auto">
      <WizardProgress step={flow.wizard.step} total={flow.wizard.total} />
      <section className="mt-6"><CurrentStep flow={flow} /></section>
      <StepActions flow={flow} />
      <PaymentSuccessDialog payment={flow.receipt} />
    </div>
  )
}

function CurrentStep({ flow }: { flow: Flow }) {
  const { draft, lookups, update } = flow
  switch (flow.wizard.step) {
    case 0: return <PayForStep draft={draft} causes={lookups.causes} onChange={update} />
    case 1: return <PayerStep draft={draft} groupName={lookups.groupName} chapters={lookups.chapters} onChange={update} />
    case 2: return <AmountStep draft={draft} activities={lookups.activities} onChange={update} />
    default: return <PayCheckStep summary={flow.summary()} />
  }
}

function StepActions({ flow }: { flow: Flow }) {
  const { wizard } = flow
  const onBack = wizard.isFirst ? undefined : wizard.back
  if (wizard.isLast) return <WizardActions onBack={onBack} onNext={flow.submit} nextLabel="Pay with Funz" nextIcon={CreditCard} loading={flow.isPaying} />
  return <WizardActions onBack={onBack} onNext={flow.next} />
}
