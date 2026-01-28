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
                <TableHeader className="bg-muted dark:bg-white/5">
                    <TableRow className="hover:bg-transparent border-border/40 dark:border-white/[0.05]">
                        <TableHead className="px-6 py-4 font-bold text-sm text-foreground">Bowler</TableHead>
                        <TableHead className="font-bold text-sm text-foreground text-right">O</TableHead>
                        <TableHead className="font-bold text-sm text-foreground text-right">M</TableHead>
                        <TableHead className="font-bold text-sm text-foreground text-right">R</TableHead>
                        <TableHead className="font-bold text-sm text-foreground text-right">W</TableHead>
                        <TableHead className="font-bold text-sm text-foreground text-right">Econ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bowlers.map((bowler, index) => (
                        <TableRow
                            key={index}
                            className="transition-all duration-300 border-border/20 dark:border-white/[0.03] hover:bg-muted/30 dark:hover:bg-white/[0.02]"
                        >
                            <TableCell className="px-6 py-4 font-medium">
                                {bowler.name}
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-right tabular-nums">
                                {bowler.overs}
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-right tabular-nums">
                                {bowler.maidens}
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-right tabular-nums">
                                {bowler.runs}
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-right tabular-nums">
                                {bowler.wickets}
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-right tabular-nums">
                                {bowler.economy.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
