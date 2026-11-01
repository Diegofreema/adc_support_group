import { Pencil, Trash2 } from 'lucide-react'

import { IconButton } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { Category } from '../types'

interface CategoryRowProps {
  category: Category
  onRename: (category: Category) => void
  onRemove: (category: Category) => void
}

export function CategoryRow({ category, onRename, onRemove }: CategoryRowProps) {
  return (
    <div className="setting">
      <span className="grow bold">{category.name}</span>
      <span className="small faint num">{formatNumber(category.groupCount)}</span>
      <IconButton icon={Pencil} label={`Rename ${category.name}`} onClick={() => onRename(category)} />
      <IconButton icon={Trash2} label={`Remove ${category.name}`} onClick={() => onRemove(category)} />
    </div>
  )
}
