import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/chapters/$chapterId')({
  staticData: { title: 'Chapter', backTo: '/chapters' },
  component: () => <p className="muted">Coming soon</p>,
})
