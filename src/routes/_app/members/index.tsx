import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/members/')({
  staticData: { title: 'Members' },
  component: () => <p className="muted">Coming soon</p>,
})
