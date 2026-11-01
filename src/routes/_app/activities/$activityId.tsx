import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/activities/$activityId')({
  staticData: { title: 'Activity', backTo: '/activities' },
  component: () => <p className="muted">Coming soon</p>,
})
