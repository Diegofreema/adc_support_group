import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/messages')({
  staticData: { title: 'Messages' },
  component: () => <p className="muted">Coming soon</p>,
})
