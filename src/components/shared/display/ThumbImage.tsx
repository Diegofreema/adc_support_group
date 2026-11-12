import { useState, type ImgHTMLAttributes } from 'react'

import { thumbUrl } from '@/lib/image'

type ThumbImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string
  /** Called when the full photo fails too (after the thumbnail did). */
  onFallbackError?: () => void
}

/**
 * A list-sized photo: loads the ~400px thumbnail beside the photo, and the
 * full photo for older uploads that have no thumbnail.
 */
export function ThumbImage({ src, alt = '', loading = 'lazy', onFallbackError, ...rest }: ThumbImageProps) {
  const [failed, setFailed] = useState(false)
  const url = failed ? src : thumbUrl(src)
  return <img {...rest} alt={alt} loading={loading} decoding="async" src={url} onError={() => (failed ? onFallbackError?.() : setFailed(true))} />
}
