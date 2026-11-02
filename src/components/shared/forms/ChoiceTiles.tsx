import type { LucideIcon } from 'lucide-react'

export interface TileOption<T extends string> {
  value: T
  label: string
  icon: LucideIcon
}

interface ChoiceTilesProps<T extends string> {
  name: string
  options: TileOption<T>[]
  value: T | undefined
  onChange: (value: T) => void
  label?: string
}

/** Grid of big icon tiles; the chosen one gets a folded green corner. */
export function ChoiceTiles<T extends string>({ name, options, value, onChange, label }: ChoiceTilesProps<T>) {
  return (
    <div className="choice-grid" role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <label key={option.value} className="choice choice-tile">
          <input type="radio" name={name} checked={value === option.value} onChange={() => onChange(option.value)} />
          <span className="tile-icon"><option.icon className="i" aria-hidden /></span>
          <span className="choice-title">{option.label}</span>
        </label>
      ))}
    </div>
  )
}
