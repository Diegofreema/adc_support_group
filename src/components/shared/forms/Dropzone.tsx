import { Upload } from 'lucide-react'
import type { ChangeEvent } from 'react'

interface DropzoneProps {
  label: string
  hint?: string
  accept?: string
  fileName?: string
  onFile: (file: File) => void
}

/** Tap-to-pick file area. Shows the chosen file name once picked. */
export function Dropzone({ label, hint, accept, fileName, onFile }: DropzoneProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onFile(file)
  }
  return (
    <label className="dropzone">
      <span className="icon-tile grey"><Upload className="i" aria-hidden /></span>
      <span className="bold">{fileName ?? label}</span>
      {hint && <span className="small faint">{hint}</span>}
      <input type="file" accept={accept} hidden onChange={handleChange} />
    </label>
  )
}
