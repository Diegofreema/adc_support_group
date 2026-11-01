import { Link } from '@tanstack/react-router'
import { Flag, Link as LinkIcon } from 'lucide-react'

import { buttonClassName } from '@/components/shared'

/** Secondary ways in: join with a link, or register a new group. */
export function AuthEntryLinks() {
  return (
    <div className="row mt-8 !gap-2.5">
      <Link to="/join/$code" params={{ code: 'atiku-women' }} className={`${buttonClassName('secondary', 'md', true)} flex-1`}>
        <LinkIcon className="i" aria-hidden />Join a group
      </Link>
      <Link to="/register" className={`${buttonClassName('secondary', 'md', true)} flex-1`}>
        <Flag className="i" aria-hidden />New group
      </Link>
    </div>
  )
}
