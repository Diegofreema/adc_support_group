import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/admin/causes')({
  staticData: { title: 'Causes', backTo: '/admin/more' },
  component: () => <p className="muted">Coming soon</p>,
})
