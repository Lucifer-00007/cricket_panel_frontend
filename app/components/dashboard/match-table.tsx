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
          <TableRow className="hover:bg-transparent border-border/40">
            <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-muted-foreground/60">Date</TableHead>
            <TableHead className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground/60">Match Key</TableHead>
            <TableHead className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground/60">Match</TableHead>
            <TableHead className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground/60">Inns 1</TableHead>
            <TableHead className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground/60">Inns 2</TableHead>
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
                  'transition-colors duration-200 border-border/20 px-6',
                  isLive && 'bg-destructive/5 hover:bg-destructive/10',
                  !isLive && 'hover:bg-muted/30',
                  isCompleted && 'text-muted-foreground/60 select-none'
                )}
              >
                <TableCell className="whitespace-nowrap px-6 py-4 text-xs font-medium">
                  {formatDateTime(match.start_date_time)}
                </TableCell>
                <TableCell className="font-mono text-[10px] font-bold text-muted-foreground/40">{matchId}</TableCell>
                <TableCell>
                  <a
                    href={match.match_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center gap-2 group transition-all',
                      isLive && 'text-destructive font-black',
                      !isLive && !isCompleted && 'text-foreground/90 font-bold hover:text-primary',
                      isCompleted && 'text-muted-foreground'
                    )}
                  >
                    {isLive && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                      {match.t1?.n || '---'} v {match.t2?.n || '---'}
                    </span>
                  </a>
                </TableCell>
                <TableCell className="font-mono text-xs font-bold text-foreground/80">
                  {match.i1?.sc || '---'}/{match.i1?.wk || '---'} <span className="text-[10px] text-muted-foreground/40 font-normal">({match.i1?.ov || '---'})</span>
                </TableCell>
                <TableCell className="font-mono text-xs font-bold text-foreground/80">
                  {match.i2?.sc || '---'}/{match.i2?.wk || '---'} <span className="text-[10px] text-muted-foreground/40 font-normal">({match.i2?.ov || '---'})</span>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
