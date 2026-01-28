import { type FallOfWicket } from '@/lib/scoreboard-types'

interface FallOfWicketsProps {
    wickets: FallOfWicket[]
}

export function FallOfWickets({ wickets }: FallOfWicketsProps) {
    if (wickets.length === 0) {
        return null
    }

    return (
        <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground">Fall of Wickets</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {wickets.map((wicket, index) => (
                    <span key={index} className="font-mono tabular-nums">
                        {wicket.score}-{wicket.wickets} ({wicket.batsman}, {wicket.overs} ov)
                    </span>
                ))}
            </div>
        </div>
    )
}
