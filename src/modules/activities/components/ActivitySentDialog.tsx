import { Link } from '@tanstack/react-router'

import { Modal, ResultHeader, buttonClassName } from '@/components/shared'

export function ActivitySentDialog({ open }: { open: boolean }) {
  return (
    <Modal open={open} onOpenChange={() => undefined} title="Sent" centered>
      <ResultHeader title="Waiting for approval" />
      <Link to="/activities" className={`${buttonClassName('primary', 'md', true)} mt-6`}>Done</Link>
    </Modal>
  )
}
