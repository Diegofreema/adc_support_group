import { WizardActions, WizardProgress } from '@/components/shared'
import type { ActivityWizardFlow } from '../hooks/use-activity-draft'
import { DetailsStep } from './DetailsStep'
import { PhotosStep } from './PhotosStep'
import { ReviewStep } from './ReviewStep'
import { TypeStep } from './TypeStep'
import { WhoDidThis } from './WhoDidThis'

/** Type → details → photos → check, shared by record and edit. */
export function ActivityWizard({ flow }: { flow: ActivityWizardFlow }) {
  return (
    <>
      <WizardProgress step={flow.wizard.step} total={flow.wizard.total} />
      <section className="mt-6"><CurrentStep flow={flow} /></section>
      <StepActions flow={flow} />
    </>
  )
}

function CurrentStep({ flow }: { flow: ActivityWizardFlow }) {
  switch (flow.wizard.step) {
    case 0: return <TypeStep options={flow.types} value={flow.type} onChange={flow.setType} />
    case 1: return (
      <DetailsStep form={flow.form} chapters={flow.chapters} defaultChapterLabel={flow.defaultChapterLabel}>
        {flow.who && <WhoDidThis choice={flow.who} />}
      </DetailsStep>
    )
    case 2: return <PhotosStep photos={flow.photos.items} max={flow.photos.max} adding={flow.photos.adding} onAdd={flow.photos.add} onRemove={flow.photos.remove} error={flow.photoError} videoUrl={flow.videoUrl} onVideoUrlChange={flow.setVideoUrl} />
    default: return <ReviewStep summary={flow.summary()} />
  }
}

function StepActions({ flow }: { flow: ActivityWizardFlow }) {
  const { wizard } = flow
  const onBack = wizard.isFirst ? undefined : wizard.back
  if (wizard.step === 1) return <WizardActions onBack={onBack} onNext={flow.submitDetails} />
  if (wizard.step === 2) return <WizardActions onBack={onBack} onNext={flow.photosNext} />
  if (wizard.isLast) return <WizardActions onBack={onBack} onNext={flow.send} nextLabel={flow.sendLabel} loading={flow.isSending} />
  return <WizardActions onBack={onBack} onNext={wizard.next} />
}
