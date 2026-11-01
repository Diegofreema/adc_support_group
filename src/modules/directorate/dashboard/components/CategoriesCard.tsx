import { Card, CardHead, HorizontalBars } from '@/components/shared'
import type { CategoryCount } from '../types'

export function CategoriesCard({ categories }: { categories: CategoryCount[] }) {
  return (
    <Card className="mt-4">
      <CardHead title="Categories" />
      <HorizontalBars items={categories} />
    </Card>
  )
}
