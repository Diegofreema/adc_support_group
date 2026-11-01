import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/activities/new')({
  staticData: { title: 'Record activity', backTo: '/activities' },
  component: () => <p className="muted">Coming soon</p>,
})
