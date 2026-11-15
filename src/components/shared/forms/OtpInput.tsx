import { OTP_LENGTH, useOtpInputs } from '@/hooks/use-otp-inputs'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  /** Shake and outline the boxes red. */
  invalid?: boolean
  autoFocus?: boolean
}

/** Six boxes; typing moves forward, backspace moves back. */
export function OtpInput({ value, onChange, label = 'Code', invalid, autoFocus }: OtpInputProps) {
  const { handleChange, handleKeyDown, register } = useOtpInputs(value, onChange)
  return (
    <div className={invalid ? 'otp has-error' : 'otp'} role="group" aria-label={label}>
      {Array.from({ length: OTP_LENGTH }, (_, index) => (
        <input
          key={index}
          ref={register(index)}
          className={value[index]?.trim() ? 'input filled' : 'input'}
          autoFocus={autoFocus && index === 0}
          aria-invalid={invalid || undefined}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          aria-label={`Digit ${index + 1}`}
          value={value[index]?.trim() ?? ''}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
        />
      ))}
    </div>
  )
}
