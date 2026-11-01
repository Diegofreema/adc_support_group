import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/group')({
  staticData: { title: 'My group' },
  component: () => <p className="muted">Coming soon</p>,
})
