import type { ReactNode } from 'react'

export interface ChoiceOption<T extends string> {
  value: T
  title: ReactNode
  description?: ReactNode
  /** Right-hand content: count, chip, amount. */
  trailing?: ReactNode
  /** Extra content under the title (e.g. a progress bar). */
  children?: ReactNode
}

interface ChoiceListProps<T extends string> {
  name: string
  options: ChoiceOption<T>[]
  value: T | undefined
  onChange: (value: T) => void
  label?: string
}

/** Radio options as full-width cards. */
export function ChoiceList<T extends string>({ name, options, value, onChange, label }: ChoiceListProps<T>) {
  return (
    <div className="choices" role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <ChoiceCard key={option.value} name={name} option={option} checked={value === option.value} onSelect={onChange} />
      ))}
    </div>
  )
}

interface ChoiceCardProps<T extends string> {
  name: string
  option: ChoiceOption<T>
  checked: boolean
  onSelect: (value: T) => void
}

function ChoiceCard<T extends string>({ name, option, checked, onSelect }: ChoiceCardProps<T>) {
  return (
    <label className="choice">
      <input type="radio" name={name} checked={checked} onChange={() => onSelect(option.value)} />
      <span className="dot" />
      <span className="grow">
        <span className="choice-title block">{option.title}</span>
        {option.description && <span className="choice-desc block">{option.description}</span>}
        {option.children}
      </span>
      {option.trailing}
    </label>
  )
}
