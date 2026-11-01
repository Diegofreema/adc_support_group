export interface PillOption<T extends string> {
  value: T
  label: string
}

interface FilterPillsProps<T extends string> {
  options: PillOption<T>[]
  value: T
  onChange: (value: T) => void
  label?: string
}

/** Single-select filter tags. */
export function FilterPills<T extends string>({ options, value, onChange, label }: FilterPillsProps<T>) {
  return (
    <div className="pills" role="group" aria-label={label}>
      {options.map((option) => (
        <button key={option.value} type="button" className="pill" aria-pressed={value === option.value} onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  )
}
