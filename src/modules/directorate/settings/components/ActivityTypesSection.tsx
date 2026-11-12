import { Card, SkeletonList, SkeletonRegion, Toggle } from '@/components/shared'
import { useActivityTypes } from '../hooks/use-settings'
import { AddItemRow } from './AddItemRow'

/** Activity types members can record; switch off to hide one. */
export function ActivityTypesSection() {
  const { items, isLoading, add, toggle } = useActivityTypes()
  return (
    <>
      {isLoading && <SkeletonRegion label="Loading activity types"><SkeletonList rows={6} leading={false} /></SkeletonRegion>}
      {!isLoading && <Card flush>
        {items.map((type) => (
          <div key={type.id} className="setting">
            <span className="bold">{type.name}</span>
            <Toggle label={type.name} checked={type.enabled} onChange={(enabled) => toggle.mutate({ type, enabled })} />
          </div>
        ))}
      </Card>}
      <AddItemRow placeholder="New activity type" onAdd={(name) => add.mutate(name)} />
    </>
  )
}
