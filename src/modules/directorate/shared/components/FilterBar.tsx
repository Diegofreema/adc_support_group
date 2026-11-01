import { SearchInput, SelectInput, type SelectOption } from '@/components/shared'

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

/** Search box + dropdown filters in one row (stacked on phones). */
export function FilterBar({ search, onSearch, placeholder, selects }: FilterBarProps) {
  return (
    <div className="filterbar mt-4">
      <SearchInput value={search} onChange={onSearch} placeholder={placeholder} />
      {selects.map((select) => (
        <SelectInput key={select.label} aria-label={select.label} options={select.options} value={select.value} onChange={(event) => select.onChange(event.target.value)} />
      ))}
    </div>
  )
}
