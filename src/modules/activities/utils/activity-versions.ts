import { formatDay, countLabel } from '@/lib/format'
import type { ActivityVersion } from '../types'

/** "Replaced 12 Nov · by Musa Bello" */
export function versionMeta(version: ActivityVersion): string {
  return [`Replaced ${formatDay(version.replacedAt)}`, version.editedBy && `by ${version.editedBy}`].filter(Boolean).join(' · ')
}

/** "Rally · 24 Oct · Kofar Mata, Ungogo, Kano · 120 people · 3 photos" */
export function versionFacts(version: ActivityVersion): string {
  return [
    version.typeName,
    formatDay(version.date),
    version.place,
    countLabel(version.peopleReached, 'person', 'people'),
    `${version.photoCount} ${version.photoCount === 1 ? 'photo' : 'photos'}`,
  ].filter(Boolean).join(' · ')
}
