import { Plus } from 'lucide-react'

import { Avatar, Button, List, ListItem, SectionTitle } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useExecutives } from '../hooks/use-executives'
import { useAddExecutive } from '../hooks/use-member-mutations'
import { AddExecutiveDialog } from './AddExecutiveDialog'

/** Leader + executives; leaders can add more. */
export function ExecutivesSection({ groupId, canManage }: { groupId: string; canManage: boolean }) {
  const { executives } = useExecutives(groupId)
  const dialog = useDisclosure()
  const addExecutive = useAddExecutive(groupId)
  const submit = (query: string, title: string) => addExecutive.mutate({ query, title }, { onSuccess: dialog.close })
  const addButton = canManage && <Button variant="ghost" size="sm" icon={Plus} onClick={dialog.open}>Add</Button>
  return (
    <section>
      <SectionTitle title="Executives" action={addButton} className="!mt-0" />
      <List>
        {executives.map((member) => (
          <ListItem key={member.id} leading={<Avatar name={member.fullName} />} title={member.fullName} meta={member.title ?? 'Executive'} />
        ))}
      </List>
      <AddExecutiveDialog open={dialog.isOpen} onOpenChange={dialog.setOpen} onSubmit={submit} />
    </section>
  )
}
