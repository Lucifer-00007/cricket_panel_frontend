import { Badge } from '@/components/ui/badge'
import { type MatchStatus } from '@/lib/types'

interface StatusBadgeProps {
  status: MatchStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<MatchStatus, 'destructive' | 'secondary' | 'default'> = {
    Live: 'destructive',
    Post: 'secondary',
    Pre: 'default',
    Preview: 'default',
    Completed: 'secondary',
  }

  const displayText: Record<MatchStatus, string> = {
    Live: 'Live',
    Post: 'Completed',
    Pre: 'Upcoming',
    Preview: 'Preview',
    Completed: 'Completed',
  }

  return (
    <Badge variant={variants[status]} className="text-xs">
      {displayText[status]}
    </Badge>
  )
}
