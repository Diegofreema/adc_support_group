import { Card, SelectInput } from '@/components/shared'
import type { ColumnMapping, ImportField } from '../types'
import { IMPORT_FIELDS } from '../utils/import-columns'

interface ColumnMappingCardProps {
  headers: string[]
  mapping: ColumnMapping
  onChange: (field: ImportField, header: string) => void
}

/** "Full name ← [Name ▾]" for each needed field. */
export function ColumnMappingCard({ headers, mapping, onChange }: ColumnMappingCardProps) {
  return (
    <Card flush>
      {IMPORT_FIELDS.map(({ field, label }) => (
        <div key={field} className="setting">
          <span className="bold">{label}</span>
          <SelectInput small options={headers} placeholder="Choose" value={mapping[field]} aria-label={`Column for ${label}`} onChange={(event) => onChange(field, event.target.value)} />
        </div>
      ))}
    </Card>
  )
}
