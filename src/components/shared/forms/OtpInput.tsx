import { OTP_LENGTH, useOtpInputs } from '@/hooks/use-otp-inputs'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

/** Six boxes; typing moves forward, backspace moves back. */
export function OtpInput({ value, onChange, label = 'Code' }: OtpInputProps) {
  const { handleChange, handleKeyDown, register } = useOtpInputs(value, onChange)
  return (
    <div className="otp" role="group" aria-label={label}>
      {Array.from({ length: OTP_LENGTH }, (_, index) => (
        <input
          key={index}
          ref={register(index)}
          className="input"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          aria-label={`Digit ${index + 1}`}
          value={value[index]?.trim() ?? ''}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
        />
      ))}
    </div>
  )
}
