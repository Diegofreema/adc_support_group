import { Camera, Upload } from 'lucide-react'
import { useEffect, useMemo, type ChangeEvent } from 'react'

import { buttonClassName } from '../actions/button-class'

interface SinglePhotoFieldProps {
  /** The photo just picked (not uploaded yet). */
  file: File | null
  onPick: (file: File) => void
  /** Photo already saved. */
  currentUrl?: string
}

/** Square preview + "Add photo" / "Change photo". Shows the picked photo straight away. */
export function SinglePhotoField({ file, onPick, currentUrl }: SinglePhotoFieldProps) {
  const preview = useObjectUrl(file)
  const shown = preview ?? currentUrl
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = event.target.files?.[0]
    if (picked) onPick(picked)
  }
  return (
    <div className="mt-5 flex items-center gap-4">
      <span className="avatar !h-[72px] !w-[72px] overflow-hidden !border-line-strong !bg-surface-muted !text-muted-foreground">
        {shown ? <img src={shown} alt="" className="size-full object-cover" /> : <Camera className="i i-lg" aria-hidden />}
      </span>
      <label className={buttonClassName('secondary', 'sm')}>
        <Upload className="i i-sm" aria-hidden />
        {shown ? 'Change photo' : 'Add photo'}
        <input type="file" accept="image/*" hidden onChange={handleChange} />
      </label>
    </div>
  )
}

/** A temporary URL for a picked file, released when it changes. */
function useObjectUrl(file: File | null): string | undefined {
  const url = useMemo(() => (file ? URL.createObjectURL(file) : undefined), [file])
  useEffect(() => () => { if (url) URL.revokeObjectURL(url) }, [url])
  return url
}
