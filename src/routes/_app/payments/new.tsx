import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/payments/new')({
  staticData: { title: 'Pay', backTo: '/payments' },
  component: () => <p className="muted">Coming soon</p>,
})
