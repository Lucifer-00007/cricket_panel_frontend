import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { type BatsmanStats } from '@/lib/scoreboard-types'


interface BattingTableProps {
    batsmen: BatsmanStats[]
}

export function BattingTable({ batsmen }: BattingTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader className="bg-muted/50 dark:bg-white/[0.05]">
                    <TableRow className="hover:bg-transparent border-border/40 dark:border-white/[0.08]">
                        <TableHead className="px-6 py-4 font-bold text-sm text-foreground dark:text-white/90">Batsman</TableHead>
                        <TableHead className="font-bold text-sm text-foreground dark:text-white/90">Status</TableHead>
                        <TableHead className="font-bold text-sm text-foreground dark:text-white/90 text-right">R</TableHead>
                        <TableHead className="font-bold text-sm text-foreground dark:text-white/90 text-right">B</TableHead>
                        <TableHead className="font-bold text-sm text-foreground dark:text-white/90 text-right">4s</TableHead>
                        <TableHead className="font-bold text-sm text-foreground dark:text-white/90 text-right">6s</TableHead>
                        <TableHead className="font-bold text-sm text-foreground dark:text-white/90 text-right">SR</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {batsmen.map((batsman, index) => (
                        <TableRow
                            key={index}
                            className={`
                                border-border/40 dark:border-white/[0.08]
                                hover:bg-muted/30 dark:hover:bg-white/[0.05]
                                transition-colors
                                ${index % 2 === 0 ? 'bg-transparent' : 'bg-muted/20 dark:bg-white/[0.02]'}
                            `}
                        >
                            <TableCell className="px-6 py-4 font-medium text-foreground dark:text-white/90">
                                {batsman.name}
                                {batsman.isNotOut && (
                                    <span className="ml-2 text-xs font-bold text-green-600 dark:text-green-400">*</span>
                                )}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground dark:text-white/60">
                                {batsman.dismissal}
                            </TableCell>
                            <TableCell className="text-right font-semibold tabular-nums text-foreground dark:text-white/90">
                                {batsman.runs}
                            </TableCell>
                            <TableCell className="text-right tabular-nums text-muted-foreground dark:text-white/70">
                                {batsman.balls}
                            </TableCell>
                            <TableCell className="text-right tabular-nums text-muted-foreground dark:text-white/70">
                                {batsman.fours}
                            </TableCell>
                            <TableCell className="text-right tabular-nums text-muted-foreground dark:text-white/70">
                                {batsman.sixes}
                            </TableCell>
                            <TableCell className="text-right tabular-nums text-muted-foreground dark:text-white/70">
                                {batsman.strikeRate.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
