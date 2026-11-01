import type { PhotoTone } from '@/types/domain'
import { cn } from '@/lib/utils'

/** Coloured block standing in for an uploaded photo. */
export function PhotoPlaceholder({ tone, crowd, className }: { tone: PhotoTone; crowd?: boolean; className?: string }) {
  return <span className={cn('ph', `ph-${tone}`, crowd && 'ph-crowd', className)} role="img" aria-label="Photo" />
}
