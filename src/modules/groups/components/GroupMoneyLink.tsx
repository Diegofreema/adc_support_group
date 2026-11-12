import { Wallet } from 'lucide-react'

import { Card, IconTile, ListItem } from '@/components/shared'

/** The way in to the group's money: balance, dues, and (for executives) records. */
export function GroupMoneyLink() {
  return (
    <Card flush className="mt-6">
      <ListItem to="/money" leading={<IconTile icon={Wallet} />} title="Group money" meta="Money in, money out, and your dues" />
    </Card>
  )
}
