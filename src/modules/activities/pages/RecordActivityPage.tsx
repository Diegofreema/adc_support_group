import { PendingGroupNote } from '@/components/shared'
import { useGroupLocked } from '@/hooks/use-group-verified'
import { ActivitySentDialog } from '../components/ActivitySentDialog'
import { ActivityWizard } from '../components/ActivityWizard'
import { useRecordActivity } from '../hooks/use-record-activity'

export function RecordActivityPage() {
  const locked = useGroupLocked()
  if (locked) {
    return (
      <div className="main-narrow mx-auto">
        <h1 className="h1">Record activity</h1>
        <PendingGroupNote className="mt-5" />
      </div>
    )
  }
  return <RecordActivityWizard />
}

function RecordActivityWizard() {
  const flow = useRecordActivity()
  return (
    <div className="main-narrow mx-auto">
      <ActivityWizard flow={flow} />
      <ActivitySentDialog status={flow.sentStatus} />
    </div>
  )
}
