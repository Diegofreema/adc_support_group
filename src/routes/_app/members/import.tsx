import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/members/import')({
  staticData: { title: 'Upload members', backTo: '/members' },
  component: () => <p className="muted">Coming soon</p>,
})
