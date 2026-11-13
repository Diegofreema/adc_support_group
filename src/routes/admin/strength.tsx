import { createFileRoute } from '@tanstack/react-router'

import { StrengthPage } from '@/modules/directorate/strength/pages/StrengthPage'

export const Route = createFileRoute('/admin/strength')({
  staticData: { title: 'Strength' },
  component: StrengthPage,
})
