import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export function MatchLegend() {
    return (
        <Card className="border border-border/40 dark:border-white/[0.06] bg-muted/20 dark:bg-white/[0.02] shadow-sm">
            <CardContent className="">
                <div className="flex items-center justify-center gap-6 flex-wrap">
                    {/* Live Match */}
                    <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="p-3 font-bold tracking-wide">
                            Live Match
                        </Badge>
                    </div>

                    {/* Completed */}
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="p-3 font-bold tracking-wide text-foreground/40 dark:text-foreground/60">
                            Completed Match
                        </Badge>
                    </div>

                    {/* Upcoming */}
                    <div className="flex items-center gap-2">
                        <Badge variant="primary" className="p-3 bg-blue-600/5 font-bold tracking-wide text-blue-600 dark:text-blue-400 border-blue-600/40 dark:border-blue-400/40">
                            Upcoming Match
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
