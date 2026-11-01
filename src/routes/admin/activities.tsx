import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/admin/activities')({
  staticData: { title: 'Activities' },
  component: () => <p className="muted">Coming soon</p>,
})
