interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

/** On/off switch. The label is for screen readers; show visible text beside it. */
export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} aria-label={label} />
      <span />
    </label>
  )
}
