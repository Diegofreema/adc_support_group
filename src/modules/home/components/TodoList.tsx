import { IconTile, List, ListItem, SectionTitle } from '@/components/shared'
import type { TodoItem } from '../types/home.types'
import { todoStyle } from '../utils/todo-style'

export function TodoList({ items }: { items: TodoItem[] }) {
  if (items.length === 0) return null
  return (
    <>
      <SectionTitle title="To do" />
      <List>
        {items.map((item) => (
          <TodoRow key={item.id} item={item} />
        ))}
      </List>
    </>
  )
}

function TodoRow({ item }: { item: TodoItem }) {
  const style = todoStyle(item)
  return <ListItem to={item.to} title={style.label} leading={<IconTile icon={style.icon} tone={style.tone} />} />
}
