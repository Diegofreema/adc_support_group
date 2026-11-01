import { Card, ConfirmDialog } from '@/components/shared'
import { useCategories } from '../hooks/use-settings'
import { useTarget } from '../hooks/use-target'
import type { Category } from '../types'
import { AddItemRow } from './AddItemRow'
import { CategoryRow } from './CategoryRow'
import { RenameModal } from './RenameModal'

/** Group categories leaders pick from when they register. */
export function CategoriesSection() {
  const { items, add, rename, remove } = useCategories()
  const renaming = useTarget<Category>()
  const removing = useTarget<Category>()
  const saveName = (name: string) => renaming.target && rename.mutate({ id: renaming.target.id, name }, { onSuccess: renaming.close })
  const confirmRemove = () => removing.target && remove.mutate(removing.target.id)
  return (
    <>
      <Card flush>{items.map((category) => <CategoryRow key={category.id} category={category} onRename={renaming.open} onRemove={removing.open} />)}</Card>
      <AddItemRow placeholder="New category" onAdd={(name) => add.mutate(name)} />
      <RenameModal key={renaming.target?.id ?? 'none'} open={renaming.isOpen} onOpenChange={renaming.setOpen} initialName={renaming.target?.name ?? ''} onSave={saveName} />
      <ConfirmDialog open={removing.isOpen} onOpenChange={removing.setOpen} title={`Remove ${removing.target?.name ?? ''}?`} description="Groups keep their category." confirmLabel="Remove" destructive onConfirm={confirmRemove} />
    </>
  )
}
