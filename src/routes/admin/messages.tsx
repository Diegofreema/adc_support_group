import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/admin/messages')({
  staticData: { title: 'Messages', backTo: '/admin/more' },
  component: () => <p className="muted">Coming soon</p>,
})
