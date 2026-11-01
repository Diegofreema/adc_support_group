interface ChannelOptionProps {
  label: string
  note: string
  checked: boolean
  onChange: (checked: boolean) => void
}

/** Checkbox card (channels can be combined, unlike ChoiceList radios). */
export function ChannelOption({ label, note, checked, onChange }: ChannelOptionProps) {
  return (
    <label className="choice">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="dot" />
      <span className="grow choice-title">{label}</span>
      <span className={`chip ${note === 'Free' ? 'chip-approved' : 'chip-neutral'}`}>{note}</span>
    </label>
  )
}
