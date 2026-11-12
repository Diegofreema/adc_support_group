import { SlidersHorizontal } from 'lucide-react'
import { useId } from 'react'

import { Button, SearchInput, SelectInput, type SelectOption } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { cn } from '@/lib/utils'
import { ALL } from '../constants/options'
import { CountChip } from './CountChip'

export interface FilterSelect {
  label: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}

interface FilterBarProps {
  search: string
  onSearch: (value: string) => void
  placeholder: string
  selects: FilterSelect[]
}

/**
 * Search box + dropdown filters in one row on wider screens. On phones the
 * dropdowns fold behind a "Filters" button so the results stay near the top.
 */
export function FilterBar({ search, onSearch, placeholder, selects }: FilterBarProps) {
  const panel = useDisclosure()
  const panelId = useId()
  const active = selects.filter((select) => select.value !== ALL).length
  return (
    <div className="filterbar mt-4">
      <div className="flex gap-2 md:contents">
        <div className="min-w-0 grow"><SearchInput value={search} onChange={onSearch} placeholder={placeholder} /></div>
        <div className="md:hidden">
          <Button icon={SlidersHorizontal} className="!min-h-[54px] !px-4" aria-expanded={panel.isOpen} aria-controls={panelId} onClick={() => panel.setOpen(!panel.isOpen)}>
            Filters{active > 0 && <CountChip count={active} tone="green" />}
          </Button>
        </div>
      </div>
      <div id={panelId} className={cn(panel.isOpen ? 'grid gap-2' : 'hidden', 'md:contents')}>
        {selects.map((select) => (
          <SelectInput key={select.label} aria-label={select.label} options={select.options} value={select.value} onChange={(event) => select.onChange(event.target.value)} />
        ))}
      </div>
    </div>
  )
}
