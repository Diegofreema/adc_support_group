import { createFileRoute } from '@tanstack/react-router'

// Placeholder: replaced by the module page.
export const Route = createFileRoute('/_app/payments/offline')({
  staticData: { title: 'Offline payment', backTo: '/payments' },
  component: () => <p className="muted">Coming soon</p>,
})
