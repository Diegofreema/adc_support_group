import { Link } from '@tanstack/react-router'

import { buttonClassName, Modal, ResultHeader } from '@/components/shared'

interface JoinDoneDialogProps {
  open: boolean
  groupName: string
}

export function JoinDoneDialog({ open, groupName }: JoinDoneDialogProps) {
  return (
    <Modal open={open} onOpenChange={() => undefined} title="You're in" centered>
      <ResultHeader title={groupName} />
      <Link to="/home" className={`${buttonClassName('primary', 'md', true)} mt-6`}>Go to home</Link>
    </Modal>
  )
}
