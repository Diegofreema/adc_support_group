import { Banner, Card, KeyValueList, type KeyValue } from '@/components/shared'

export function PayCheckStep({ summary }: { summary: KeyValue[] }) {
  return (
    <>
      <h1 className="h1">Check</h1>
      <Card className="mt-5"><KeyValueList items={summary} /></Card>
      <Banner tone="info" className="mt-4">You'll pay securely on Funz.</Banner>
    </>
  )
}
