import { Download } from 'lucide-react'

import { Button, Card, Tag } from '@/components/shared'
import { IMPORT_FIELDS } from '../utils/import-columns'

/** Which columns the file must have, plus the template download. */
export function NeededColumns({ onTemplate }: { onTemplate: () => void }) {
  return (
    <Card className="!px-4 !py-3.5">
      <div className="row-between">
        <span className="bold small">Needed columns</span>
        <Button variant="ghost" size="sm" icon={Download} onClick={onTemplate}>Template</Button>
      </div>
      <div className="row wrap mt-3 !gap-1.5">
        {IMPORT_FIELDS.map((item) => <Tag key={item.field}>{item.label}</Tag>)}
      </div>
    </Card>
  )
}
