import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/admin/more')({
  staticData: { title: 'More' },
  component: () => <p className="muted">Coming soon</p>,
})
