import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/members/add')({
  staticData: { title: 'Add members', backTo: '/members' },
  component: () => <p className="muted">Coming soon</p>,
})
