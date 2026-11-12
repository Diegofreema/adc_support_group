interface ChannelOptionProps {
  name: string
  label: string
  note: string
  checked: boolean
  onSelect: () => void
}

/** One delivery channel (radio card). */
export function ChannelOption({ name, label, note, checked, onSelect }: ChannelOptionProps) {
  return (
    <label className="choice">
      <input type="radio" name={name} checked={checked} onChange={onSelect} />
      <span className="dot" />
      <span className="grow choice-title">{label}</span>
      <span className="chip chip-approved">{note}</span>
    </label>
  )
}
