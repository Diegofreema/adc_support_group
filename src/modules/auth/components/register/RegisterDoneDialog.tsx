import { Link } from '@tanstack/react-router'

import { buttonClassName, Modal, ResultHeader, Timeline, type TimelineStep } from '@/components/shared'

const STEPS: TimelineStep[] = [
  { title: 'Sent', meta: 'Today', state: 'done' },
  { title: 'Checking', meta: 'Directorate', state: 'now' },
  { title: 'Verified', state: 'todo' },
]

const TITLES = { submitted: 'Submitted', resubmitted: 'Resubmitted', saved: 'Changes saved' } as const

export function RegisterDoneDialog({ open, mode = 'submitted' }: { open: boolean; mode?: keyof typeof TITLES }) {
  return (
    <Modal open={open} onOpenChange={() => undefined} title={TITLES[mode]}>
      <ResultHeader title={mode === 'saved' ? 'Your place in the queue is kept' : 'Usually 1–3 days'} />
      <div className="mt-6"><Timeline steps={STEPS} /></div>
      <Link to="/home" className={`${buttonClassName('primary', 'md', true)} mt-6`}>Go to home</Link>
    </Modal>
  )
}
