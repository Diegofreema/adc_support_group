import { Link } from '@tanstack/react-router'

import { Modal, ResultHeader, buttonClassName } from '@/components/shared'
import type { ActivityStatus } from '@/types/domain'

/** A leader's own activity is approved at once; others wait for the leader. */
export function ActivitySentDialog({ status }: { status?: ActivityStatus }) {
  return (
    <Modal open={Boolean(status)} onOpenChange={() => undefined} title={status === 'approved' ? 'Recorded' : 'Sent'} centered>
      <ResultHeader title={status === 'approved' ? 'Activity recorded' : 'Waiting for approval'} />
      <Link to="/activities" className={`${buttonClassName('primary', 'md', true)} mt-6`}>Done</Link>
    </Modal>
  )
}
