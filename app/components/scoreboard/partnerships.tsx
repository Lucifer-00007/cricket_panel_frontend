import { type PartnershipHistory } from '@/lib/scoreboard-types'

interface PartnershipsProps {
    partnerships: PartnershipHistory[]
}

export function Partnerships({ partnerships }: PartnershipsProps) {
    if (!partnerships || partnerships.length === 0) {
        return null
    }

    return (
        <div className="space-y-2 my-2.5">
            <h3 className="text-sm font-bold text-foreground dark:text-white/90">Partnerships</h3>
            <div className="grid grid-cols-1 gap-2">
                {partnerships.map((partnership, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between text-sm bg-muted/30 dark:bg-white/[0.03] px-4 py-2 rounded-md"
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-mono tabular-nums text-muted-foreground dark:text-white/60 min-w-[60px]">
                                {partnership.wicket === 0 ? 'Unbroken' : `${partnership.wicket}${getOrdinalSuffix(partnership.wicket)} wkt`}
                            </span>
                            <span className="text-foreground dark:text-white/90">
                                {partnership.batsman1} & {partnership.batsman2}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-semibold tabular-nums text-foreground dark:text-white/90">
                                {partnership.runs} runs
                            </span>
                            <span className="font-mono tabular-nums text-muted-foreground dark:text-white/60">
                                ({partnership.balls} balls)
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function getOrdinalSuffix(num: number): string {
    const j = num % 10
    const k = num % 100
    if (j === 1 && k !== 11) return num + 'st'
    if (j === 2 && k !== 12) return num + 'nd'
    if (j === 3 && k !== 13) return num + 'rd'
    return num + 'th'
}
