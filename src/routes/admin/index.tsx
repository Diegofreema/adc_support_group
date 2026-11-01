import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/admin/')({
  staticData: { title: 'Overview' },
  component: () => <p className="muted">Coming soon</p>,
})
