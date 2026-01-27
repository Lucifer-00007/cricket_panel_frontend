import { Badge } from '@/components/ui/badge'
import { type MatchStatus } from '@/lib/types'

interface StatusBadgeProps {
  status: MatchStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    Live: 'destructive',
    Post: 'secondary',
    Pre: 'default',
  } as const

  return (
    <Badge variant={variants[status]} className="text-xs">
      {status === 'Post' ? 'Completed' : status === 'Pre' ? 'Upcoming' : 'Live'}
    </Badge>
  )
}
