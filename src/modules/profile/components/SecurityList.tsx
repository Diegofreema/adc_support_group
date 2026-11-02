import { KeyRound, LogOut } from 'lucide-react'

import { IconTile, List, ListItem, SectionTitle } from '@/components/shared'

interface SecurityListProps {
  onChangePassword: () => void
  onLogout: () => void
}

export function SecurityList({ onChangePassword, onLogout }: SecurityListProps) {
  return (
    <>
      <SectionTitle title="Security" />
      <List>
        <ListItem title="Change password" leading={<IconTile icon={KeyRound} tone="grey" />} onClick={onChangePassword} />
        <ListItem title={<span className="red">Log out</span>} leading={<IconTile icon={LogOut} tone="red" />} onClick={onLogout} />
      </List>
    </>
  )
}
