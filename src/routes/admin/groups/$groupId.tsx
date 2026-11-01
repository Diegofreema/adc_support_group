import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/admin/groups/$groupId')({
  staticData: { title: 'Review group', backTo: '/admin/groups' },
  component: () => <p className="muted">Coming soon</p>,
})
