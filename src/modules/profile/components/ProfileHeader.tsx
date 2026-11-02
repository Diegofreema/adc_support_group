import { Avatar } from '@/components/shared'

export function ProfileHeader({ name, phone }: { name: string; phone: string }) {
  return (
    <div className="row">
      <Avatar name={name} size="lg" />
      <div className="grow">
        <h1 className="h2">{name}</h1>
        <p className="muted small">{phone}</p>
      </div>
    </div>
  )
}
