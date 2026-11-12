import { Link } from '@tanstack/react-router'
import { Pencil } from 'lucide-react'

import { buttonClassName } from '@/components/shared'

/** Opens the registration form prefilled; a rejected group goes back to the queue. */
export function EditDetailsLink({ rejected, primary }: { rejected: boolean; primary: boolean }) {
  return (
    <Link to="/register" search={{ edit: true }} className={`${buttonClassName(primary ? 'primary' : 'secondary', 'md', true)} mt-4`}>
      <Pencil className="i" aria-hidden />
      {rejected ? 'Edit and resubmit' : 'Edit details'}
    </Link>
  )
}
