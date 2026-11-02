import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

import { OtpInput } from '@/components/shared'

interface CodeFieldProps<Values extends FieldValues> {
  control: Control<Values>
  name: Path<Values>
  error?: string
}

/** Six-box code input bound to a form field. */
export function CodeField<Values extends FieldValues>({ control, name, error }: CodeFieldProps<Values>) {
  return (
    <div className="mt-5">
      <Controller control={control} name={name} render={({ field }) => <OtpInput value={field.value} onChange={field.onChange} />} />
      {error && <span className="error-text" role="alert">{error}</span>}
    </div>
  )
}
