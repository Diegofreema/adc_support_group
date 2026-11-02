import { Card, KeyValueList, type KeyValue } from '@/components/shared'

export function ReviewStep({ summary }: { summary: KeyValue[] }) {
  return (
    <>
      <h1 className="h1">Check and send</h1>
      <Card className="mt-5"><KeyValueList items={summary} /></Card>
    </>
  )
}
