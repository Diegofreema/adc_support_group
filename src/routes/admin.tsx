import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/components/layout/AppShell'
import { requireRole } from '@/lib/route-guards'

/** Campaign Directorate (super admin + directorate staff). */
export const Route = createFileRoute('/admin')({
  beforeLoad: requireRole(['directorate']),
  component: AppShell,
})
