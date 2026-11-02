import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { buttonClassName } from '@/components/shared'

/** The home screen's one green button. */
export function RecordActivityLink() {
  return (
    <Link to="/activities/new" className={buttonClassName('primary', 'md', true)}>
      <Plus className="i" aria-hidden />
      Record activity
    </Link>
  )
}
