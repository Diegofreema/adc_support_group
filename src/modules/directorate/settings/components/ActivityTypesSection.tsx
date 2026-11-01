import { Card, Toggle } from '@/components/shared'
import { useActivityTypes } from '../hooks/use-settings'
import { AddItemRow } from './AddItemRow'

/** Activity types members can record; switch off to hide one. */
export function ActivityTypesSection() {
  const { items, add, toggle } = useActivityTypes()
  return (
    <>
      <Card flush>
        {items.map((type) => (
          <div key={type.id} className="setting">
            <span className="bold">{type.name}</span>
            <Toggle label={type.name} checked={type.enabled} onChange={(enabled) => toggle.mutate({ id: type.id, enabled })} />
          </div>
        ))}
      </Card>
      <AddItemRow placeholder="New activity type" onAdd={(name) => add.mutate(name)} />
    </>
  )
}
