import { Search } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = 'Search' }: SearchInputProps) {
  return (
    <div className="search">
      <Search className="i" aria-hidden />
      <input className="input" type="search" value={value} placeholder={placeholder} aria-label={placeholder} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}
