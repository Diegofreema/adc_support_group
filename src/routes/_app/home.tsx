import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/home')({
  staticData: { title: 'Home' },
  component: () => <p className="muted">Coming soon</p>,
})
