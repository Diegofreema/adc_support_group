import { WizardActions, WizardProgress } from '@/components/shared'
import { ActivitySentDialog } from '../components/ActivitySentDialog'
import { DetailsStep } from '../components/DetailsStep'
import { PhotosStep } from '../components/PhotosStep'
import { ReviewStep } from '../components/ReviewStep'
import { TypeStep } from '../components/TypeStep'
import { useRecordActivity } from '../hooks/use-record-activity'

type Flow = ReturnType<typeof useRecordActivity>

export function RecordActivityPage() {
  const flow = useRecordActivity()
  return (
    <div className="main-narrow mx-auto">
      <WizardProgress step={flow.wizard.step} total={flow.wizard.total} />
      <section className="mt-6"><CurrentStep flow={flow} /></section>
      <StepActions flow={flow} />
      <ActivitySentDialog open={flow.isSent} />
    </div>
  )
}

function CurrentStep({ flow }: { flow: Flow }) {
  switch (flow.wizard.step) {
    case 0: return <TypeStep value={flow.type} onChange={flow.setType} />
    case 1: return <DetailsStep form={flow.form} />
    case 2: return <PhotosStep photos={flow.photos.items} max={flow.photos.max} onAdd={flow.photos.add} onRemove={flow.photos.remove} videoUrl={flow.videoUrl} onVideoUrlChange={flow.setVideoUrl} />
    default: return <ReviewStep summary={flow.summary()} />
  }
}

function StepActions({ flow }: { flow: Flow }) {
  const { wizard } = flow
  const onBack = wizard.isFirst ? undefined : wizard.back
  if (wizard.step === 1) return <WizardActions onBack={onBack} onNext={flow.submitDetails} />
  if (wizard.isLast) return <WizardActions onBack={onBack} onNext={flow.send} nextLabel="Send" loading={flow.isSending} />
  return <WizardActions onBack={onBack} onNext={wizard.next} />
}
