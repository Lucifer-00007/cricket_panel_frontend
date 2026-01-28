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
          <TableRow className="hover:bg-transparent border-border/40 dark:border-white/[0.05]">
            <TableHead className="px-6 py-4 font-bold text-sm text-foreground">Date</TableHead>
            <TableHead className="font-bold text-sm text-foreground">Match Key</TableHead>
            <TableHead className="font-bold text-sm text-foreground">Match</TableHead>
            <TableHead className="font-bold text-sm text-foreground">Inns 1</TableHead>
            <TableHead className="font-bold text-sm text-foreground">Inns 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map(([matchId, match]) => {
            const isLive = match.match_status === 'Live'
            const isCompleted = match.match_status === 'Post' || match.match_status === 'Completed'
            const isUpcoming = match.match_status === 'Pre' || match.match_status === 'Preview'

            return (
              <TableRow
                key={matchId}
                className={cn(
                  'transition-all duration-300 border-border/20 dark:border-white/[0.03] px-6 group/row',
                  isLive && 'text-destructive dark:text-red-400',
                  isUpcoming && 'text-blue-600 dark:text-blue-400',
                  isCompleted && 'text-foreground/40 dark:text-foreground/60',
                  'hover:bg-muted/30 dark:hover:bg-white/[0.02]'
                )}
              >
                <TableCell className="whitespace-nowrap px-6 py-4 text-xs font-medium">
                  {formatDateTime(match.start_date_time)}
                </TableCell>
                <TableCell className="font-mono text-xs font-medium">{matchId}</TableCell>
                <TableCell>
                  <a
                    href={match.match_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center gap-2 transition-all hover:underline font-semibold',
                      isLive && 'text-destructive dark:text-red-400',
                      isUpcoming && 'text-blue-600 dark:text-blue-400',
                      isCompleted && 'text-foreground/40 dark:text-foreground/60'
                    )}
                  >
                    <span className="truncate max-w-[200px] lg:max-w-none">
                      {match.t1?.n || '---'} v {match.t2?.n || '---'}
                    </span>
                  </a>
                </TableCell>
                <TableCell className="font-mono text-xs font-medium">
                  <span className="tabular-nums">{match.i1?.sc || '0'}</span>/<span className="tabular-nums">{match.i1?.wk || '0'}</span>({match.i1?.ov || '0'})
                </TableCell>
                <TableCell className="font-mono text-xs font-medium">
                  <span className="tabular-nums">{match.i2?.sc || '0'}</span>/<span className="tabular-nums">{match.i2?.wk || '0'}</span>({match.i2?.ov || '0'})
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
