import { cn } from '@/lib/utils'

interface ChannelOptionProps {
  name: string
  label: string
  note: string
  /** Amber note for a channel that costs money. */
  costs?: boolean
  checked: boolean
  onSelect: () => void
}

/** One delivery channel (radio card). */
export function ChannelOption({ name, label, note, costs, checked, onSelect }: ChannelOptionProps) {
  return (
    <label className="choice">
      <input type="radio" name={name} checked={checked} onChange={onSelect} />
      <span className="dot" />
      <span className="grow choice-title">{label}</span>
      <span className={cn('chip', costs ? 'chip-pending' : 'chip-approved')}>{note}</span>
    </label>
  )
}
