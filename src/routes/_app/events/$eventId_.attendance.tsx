import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { AttendancePage } from '@/modules/events/pages/AttendancePage'

export const Route = createFileRoute('/_app/events/$eventId_/attendance')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Attendance', backTo: '/events' },
  component: AttendancePage,
})
