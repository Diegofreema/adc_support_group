import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/chapters/')({
  staticData: { title: 'Chapters' },
  component: () => <p className="muted">Coming soon</p>,
})
