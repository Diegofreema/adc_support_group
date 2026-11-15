import { Dropzone, Field } from '@/components/shared'

interface ProofFieldProps {
  fileName?: string
  error?: string
  onFile: (file: File) => void
}

/** Receipt photo or PDF for an offline payment. */
export function ProofField({ fileName, error, onFile }: ProofFieldProps) {
  return (
    <Field label="Proof of payment" error={error}>
      <Dropzone label="Add a photo or PDF" hint="A receipt or a screenshot of the bank alert" accept="image/jpeg,image/png,image/webp,application/pdf" fileName={fileName} onFile={onFile} />
    </Field>
  )
}
