import { type PowerplayInfo } from '@/lib/scoreboard-types'

interface PowerplaysProps {
    powerplays: PowerplayInfo[]
}

export function Powerplays({ powerplays }: PowerplaysProps) {
    if (!powerplays || powerplays.length === 0) {
        return null
    }

    return (
        <div className="space-y-2 my-2.5">
            <h3 className="text-sm font-bold text-foreground dark:text-white/90">Powerplays</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {powerplays.map((powerplay, index) => (
                    <div
                        key={index}
                        className="bg-muted/30 dark:bg-white/[0.03] px-4 py-3 rounded-md border border-border/40 dark:border-white/[0.08]"
                    >
                        <div className="text-xs text-muted-foreground dark:text-white/60 mb-1">
                            {index === 0 ? 'Powerplay 1' : index === 1 ? 'Powerplay 2' : 'Powerplay 3'}
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-sm font-mono text-muted-foreground dark:text-white/70">
                                Overs {powerplay.overs}:
                            </span>
                            <span className="text-base font-semibold text-foreground dark:text-white/90">
                                {powerplay.runs}/{powerplay.wickets}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
