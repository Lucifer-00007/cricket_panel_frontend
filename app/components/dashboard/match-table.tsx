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
            <TableHead className="px-6 py-4 font-black uppercase tracking-[0.2em] text-[10px] text-muted-foreground/80 dark:text-muted-foreground/60">Date</TableHead>
            <TableHead className="font-black uppercase tracking-[0.2em] text-[10px] text-muted-foreground/80 dark:text-muted-foreground/60">Match Key</TableHead>
            <TableHead className="font-black uppercase tracking-[0.2em] text-[10px] text-muted-foreground/80 dark:text-muted-foreground/60">Match</TableHead>
            <TableHead className="font-black uppercase tracking-[0.2em] text-[10px] text-muted-foreground/80 dark:text-muted-foreground/60">Inns 1</TableHead>
            <TableHead className="font-black uppercase tracking-[0.2em] text-[10px] text-muted-foreground/80 dark:text-muted-foreground/60">Inns 2</TableHead>
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
                  'transition-all duration-300 border-border/20 dark:border-white/[0.03] px-6 group/row',
                  isLive && 'bg-destructive/[0.03] hover:bg-destructive/[0.08] dark:bg-destructive/[0.05] dark:hover:bg-destructive/[0.1] shadow-inner',
                  !isLive && 'hover:bg-muted/30 dark:hover:bg-white/[0.02]',
                  isCompleted && 'text-muted-foreground/50 opacity-70 grayscale-[0.5] select-none'
                )}
              >
                <TableCell className="whitespace-nowrap px-6 py-5 text-xs font-bold tracking-tight text-foreground/80">
                  {formatDateTime(match.start_date_time)}
                </TableCell>
                <TableCell className="font-mono text-[10px] font-black text-muted-foreground/50 group-hover/row:text-muted-foreground/80 transition-colors">#{matchId}</TableCell>
                <TableCell>
                  <a
                    href={match.match_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center gap-3 group/link transition-all',
                      isLive && 'text-destructive font-black',
                      !isLive && !isCompleted && 'text-foreground/90 font-black hover:text-primary',
                      isCompleted && 'text-muted-foreground'
                    )}
                  >
                    {isLive && (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></span>
                      </span>
                    )}
                    <span className="group-hover/link:translate-x-1 transition-transform duration-500 truncate max-w-[200px] lg:max-w-none">
                      {match.t1?.n || '---'} v {match.t2?.n || '---'}
                    </span>
                  </a>
                </TableCell>
                <TableCell className="font-mono text-xs font-black text-foreground/70 group-hover/row:text-foreground transition-colors">
                  <span className="tabular-nums">{match.i1?.sc || '---'}</span>/<span className="tabular-nums">{match.i1?.wk || '---'}</span> 
                  <span className="ml-1.5 text-[10px] text-muted-foreground/60 font-medium tabular-nums">({match.i1?.ov || '---'})</span>
                </TableCell>
                <TableCell className="font-mono text-xs font-black text-foreground/70 group-hover/row:text-foreground transition-colors">
                  <span className="tabular-nums">{match.i2?.sc || '---'}</span>/<span className="tabular-nums">{match.i2?.wk || '---'}</span> 
                  <span className="ml-1.5 text-[10px] text-muted-foreground/60 font-medium tabular-nums">({match.i2?.ov || '---'})</span>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
