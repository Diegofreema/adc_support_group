import { formatDay } from '@/lib/format'
import type { Status } from '@/types/domain'
import type { Departure } from '../types'

/** Chip status + word for a departure ("Deletion due 3 Dec"). */
export function departureChip(departure: Departure): { status: Status; label: string } {
  switch (departure.status) {
    case 'left': return { status: 'closed', label: 'Left' }
    case 'details_deleted': return { status: 'closed', label: 'Details deleted' }
    case 'pending': return { status: 'pending', label: departure.dueAt ? `Deletion due ${formatDay(departure.dueAt)}` : 'Deletion due' }
    case 'cancelled': return { status: 'rejected', label: 'Cancelled' }
    case 'done': return { status: 'approved', label: 'Done' }
  }
}
