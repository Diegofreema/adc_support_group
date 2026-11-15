import { Dropzone, Field } from '@/components/shared'

interface ProofFieldProps {
  label: string
  fileName?: string
  error?: string
  optional?: boolean
  onFile: (file: File) => void
}

/** Photo or PDF of the receipt / proof of payment. */
export function ProofField({ label, fileName, error, optional, onFile }: ProofFieldProps) {
  return (
    <Field label={label} error={error} optional={optional}>
      <Dropzone label="Add a photo" hint="Take a picture of the receipt, or add a PDF" accept="image/jpeg,image/png,image/webp,application/pdf" fileName={fileName} onFile={onFile} />
    </Field>
  )
}
