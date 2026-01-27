import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type SiteData } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface MatchTableProps {
  data: SiteData
}

export function MatchTable({ data }: MatchTableProps) {
  const matches = Object.entries(data).filter(([, match]) => match.t1)

  if (matches.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No matches available</p>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Match Key</TableHead>
            <TableHead>Match</TableHead>
            <TableHead>Inns 1</TableHead>
            <TableHead>Inns 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map(([matchId, match]) => {
            const isLive = match.match_status === 'Live'
            const isCompleted = match.match_status === 'Post'

            return (
              <TableRow
                key={matchId}
                className={cn(
                  isLive && 'bg-destructive/10',
                  isCompleted && 'text-muted-foreground'
                )}
              >
                <TableCell className="whitespace-nowrap">
                  {formatDateTime(match.start_date_time)}
                </TableCell>
                <TableCell className="font-mono text-sm">{matchId}</TableCell>
                <TableCell>
                  <a
                    href={match.match_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'hover:underline',
                      isLive && 'text-destructive font-semibold',
                      isCompleted && 'text-muted-foreground'
                    )}
                  >
                    {match.t1?.n || '---'} v {match.t2?.n || '---'}
                  </a>
                </TableCell>
                <TableCell>
                  {match.i1?.sc || '---'}/{match.i1?.wk || '---'} ({match.i1?.ov || '---'})
                </TableCell>
                <TableCell>
                  {match.i2?.sc || '---'}/{match.i2?.wk || '---'} ({match.i2?.ov || '---'})
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
