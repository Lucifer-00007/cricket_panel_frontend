import { type FallOfWicket } from '@/lib/scoreboard-types'

interface FallOfWicketsProps {
    wickets: FallOfWicket[]
}

export function FallOfWickets({ wickets }: FallOfWicketsProps) {
    if (wickets.length === 0) {
        return null
    }

    return (
        <div className="space-y-2 my-2.5">
            <h3 className="text-sm font-bold text-foreground dark:text-white/90">Fall of Wickets</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {wickets.map((wicket, index) => (
                    <span key={index} className="font-mono tabular-nums text-muted-foreground dark:text-white/70">
                        {wicket.score}-{wicket.wickets} <span className="text-muted-foreground/70 dark:text-white/50">({wicket.batsman}, {wicket.overs} ov)</span>
                    </span>
                ))}
            </div>
        </div>
    )
}
