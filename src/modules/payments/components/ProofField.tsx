import { Dropzone, Field } from '@/components/shared'

interface ProofFieldProps {
  fileName: string
  error?: string
  onFile: (name: string) => void
}

/** Receipt photo or PDF for an offline payment. */
export function ProofField({ fileName, error, onFile }: ProofFieldProps) {
  return (
    <Field label="Proof" error={error}>
      <Dropzone label="Add photo or PDF" hint="Receipt or screenshot" accept="image/*,.pdf" fileName={fileName || undefined} onFile={(file) => onFile(file.name)} />
    </Field>
  )
}
