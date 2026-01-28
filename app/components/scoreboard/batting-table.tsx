import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { type BatsmanStats } from '@/lib/scoreboard-types'
import { cn } from '@/lib/utils'

interface BattingTableProps {
    batsmen: BatsmanStats[]
}

export function BattingTable({ batsmen }: BattingTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader className="bg-muted dark:bg-white/5">
                    <TableRow className="hover:bg-transparent border-border/40 dark:border-white/[0.05]">
                        <TableHead className="px-6 py-4 font-bold text-sm text-foreground">Batsman</TableHead>
                        <TableHead className="font-bold text-sm text-foreground">Status</TableHead>
                        <TableHead className="font-bold text-sm text-foreground text-right">R</TableHead>
                        <TableHead className="font-bold text-sm text-foreground text-right">B</TableHead>
                        <TableHead className="font-bold text-sm text-foreground text-right">4s</TableHead>
                        <TableHead className="font-bold text-sm text-foreground text-right">6s</TableHead>
                        <TableHead className="font-bold text-sm text-foreground text-right">SR</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {batsmen.map((batsman, index) => (
                        <TableRow
                            key={index}
                            className={cn(
                                'transition-all duration-300 border-border/20 dark:border-white/[0.03]',
                                batsman.isNotOut && 'font-semibold text-foreground',
                                'hover:bg-muted/30 dark:hover:bg-white/[0.02]'
                            )}
                        >
                            <TableCell className="px-6 py-4 font-medium">
                                {batsman.name}
                                {batsman.isNotOut && <span className="text-xs ml-1 text-muted-foreground">*</span>}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                                {batsman.dismissal}
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-right tabular-nums">
                                {batsman.runs}
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-right tabular-nums">
                                {batsman.balls}
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-right tabular-nums">
                                {batsman.fours}
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-right tabular-nums">
                                {batsman.sixes}
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-right tabular-nums">
                                {batsman.strikeRate.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
