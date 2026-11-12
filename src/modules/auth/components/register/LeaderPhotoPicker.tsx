import { Camera, Upload } from 'lucide-react'
import type { ChangeEvent } from 'react'

import { buttonClassName } from '@/components/shared'

interface LeaderPhotoPickerProps {
  fileName: string
  onPick: (file: File) => void
  /** Photo already saved (editing). */
  currentUrl?: string
}

/** Square photo slot + "Add photo" button. */
export function LeaderPhotoPicker({ fileName, onPick, currentUrl }: LeaderPhotoPickerProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onPick(file)
  }
  return (
    <div className="mt-5 flex items-center gap-4">
      <span className="avatar !h-[72px] !w-[72px] overflow-hidden !border-line-strong !bg-surface-muted !text-muted-foreground">
        {currentUrl && !fileName ? <img src={currentUrl} alt="" className="size-full object-cover" /> : <Camera className="i i-lg" aria-hidden />}
      </span>
      <label className={buttonClassName('secondary', 'sm')}>
        <Upload className="i i-sm" aria-hidden />
        {fileName || (currentUrl ? 'Change photo' : 'Add photo')}
        <input type="file" accept="image/*" hidden onChange={handleChange} />
      </label>
    </div>
  )
}
