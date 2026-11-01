import { initials } from '@/lib/format'
import { cn } from '@/lib/utils'

type AvatarSize = 'sm' | 'md' | 'lg'
const SIZE_CLASS: Record<AvatarSize, string> = { sm: 'avatar-sm', md: '', lg: 'avatar-lg' }
const TONES = ['', 'a2', 'a3', 'a4', 'a5']

/** Stable colour per name so the same person always looks the same. */
function toneFor(name: string): string {
  const sum = [...name].reduce((total, char) => total + char.charCodeAt(0), 0)
  return TONES[sum % TONES.length]!
}

export function Avatar({ name, size = 'md' }: { name: string; size?: AvatarSize }) {
  return <span className={cn('avatar', SIZE_CLASS[size], toneFor(name))} aria-hidden>{initials(name)}</span>
}
