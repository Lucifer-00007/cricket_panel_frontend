import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { type BowlerStats } from '@/lib/scoreboard-types'

interface BowlingTableProps {
    bowlers: BowlerStats[]
}

export function BowlingTable({ bowlers }: BowlingTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader className="bg-muted/50 dark:bg-white/[0.05]">
                    <TableRow className="hover:bg-transparent border-border/40 dark:border-white/[0.08]">
                        <TableHead className="px-6 py-4 font-bold text-sm text-foreground dark:text-white/90">Bowler</TableHead>
                        <TableHead className="font-bold text-sm text-foreground dark:text-white/90 text-right">O</TableHead>
                        <TableHead className="font-bold text-sm text-foreground dark:text-white/90 text-right">M</TableHead>
                        <TableHead className="font-bold text-sm text-foreground dark:text-white/90 text-right">R</TableHead>
                        <TableHead className="font-bold text-sm text-foreground dark:text-white/90 text-right">W</TableHead>
                        <TableHead className="font-bold text-sm text-foreground dark:text-white/90 text-right">Econ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bowlers.map((bowler, index) => (
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
                                {bowler.name}
                            </TableCell>
                            <TableCell className="text-right tabular-nums text-muted-foreground dark:text-white/70">
                                {bowler.overs}
                            </TableCell>
                            <TableCell className="text-right tabular-nums text-muted-foreground dark:text-white/70">
                                {bowler.maidens}
                            </TableCell>
                            <TableCell className="text-right tabular-nums text-muted-foreground dark:text-white/70">
                                {bowler.runs}
                            </TableCell>
                            <TableCell className="text-right font-semibold tabular-nums text-foreground dark:text-white/90">
                                {bowler.wickets}
                            </TableCell>
                            <TableCell className="text-right tabular-nums text-muted-foreground dark:text-white/70">
                                {bowler.economy.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
