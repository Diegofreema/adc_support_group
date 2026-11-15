import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { Modal, ResultHeader, buttonClassName } from '@/components/shared'
import type { ActivityStatus } from '@/types/domain'

/** A leader's own activity is approved at once; others wait for the leader. */
export function ActivitySentDialog({ status }: { status?: ActivityStatus }) {
  const approved = status === 'approved'
  return (
    <Modal open={Boolean(status)} onOpenChange={() => undefined} title={approved ? 'Activity recorded' : 'Activity sent'} centered>
      <ResultHeader
        title={approved ? 'Well done!' : 'Sent to your leader'}
        subtitle={approved ? 'It now counts for your group.' : 'Your leader will check it. We’ll tell you when it’s approved.'}
      />
      <Link to="/activities" className={`${buttonClassName('primary', 'lg', true)} mt-6`}>Done</Link>
      {/* reloadDocument: a fresh wizard, not the one that just sent */}
      <Link to="/activities/new" reloadDocument className={`${buttonClassName('ghost', 'md', true)} mt-2`}><Plus className="i" aria-hidden />Record another</Link>
    </Modal>
  )
}
