import { Dropzone, Field } from '@/components/shared'

interface ProofFieldProps {
  fileName?: string
  error?: string
  onFile: (file: File) => void
}

/** Receipt photo or PDF for an offline payment. */
export function ProofField({ fileName, error, onFile }: ProofFieldProps) {
  return (
    <Field label="Proof" error={error}>
      <Dropzone label="Add photo or PDF" hint="Receipt or screenshot, up to 10 MB" accept="image/jpeg,image/png,image/webp,application/pdf" fileName={fileName} onFile={onFile} />
    </Field>
  )
}
