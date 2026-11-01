import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/payments/$paymentId')({
  staticData: { title: 'Receipt', backTo: '/payments' },
  component: () => <p className="muted">Coming soon</p>,
})
