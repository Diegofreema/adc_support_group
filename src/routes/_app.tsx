import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/components/layout/AppShell'
import { requireRole } from '@/lib/route-guards'

/** Leaders, executives, coordinators and members. */
export const Route = createFileRoute('/_app')({
  beforeLoad: requireRole(['leader', 'member']),
  component: AppShell,
})
