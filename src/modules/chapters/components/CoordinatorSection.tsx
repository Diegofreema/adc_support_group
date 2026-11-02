import { Phone, Repeat } from 'lucide-react'

import { Avatar, Button, List, ListItem, SectionTitle, buttonClassName } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useChangeCoordinator } from '../hooks/use-chapter-mutations'
import type { ChapterRecord } from '../types'
import { ChangeCoordinatorDialog } from './ChangeCoordinatorDialog'

/** Who runs the chapter, a call button, and "Change". */
export function CoordinatorSection({ chapter, canManage }: { chapter: ChapterRecord; canManage: boolean }) {
  const dialog = useDisclosure()
  const change = useChangeCoordinator(chapter.id)
  const submit = (coordinator: string) => change.mutate(coordinator, { onSuccess: dialog.close })
  const callLink = <a className={buttonClassName('secondary', 'sm')} href={`tel:${chapter.coordinatorPhone}`} aria-label={`Call ${chapter.coordinatorName}`}><Phone className="i i-sm" /></a>
  return (
    <section>
      <SectionTitle title="Coordinator" className="!mt-0" action={canManage && <Button variant="ghost" size="sm" icon={Repeat} onClick={dialog.open}>Change</Button>} />
      <List>
        <ListItem leading={<Avatar name={chapter.coordinatorName} />} title={chapter.coordinatorName} meta={chapter.coordinatorPhone} trailing={callLink} />
      </List>
      <ChangeCoordinatorDialog open={dialog.isOpen} onOpenChange={dialog.setOpen} onSubmit={submit} />
    </section>
  )
}
