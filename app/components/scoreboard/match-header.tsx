import { Card, CardContent } from '@/components/ui/card'

interface MatchHeaderProps {
    matchTitle: string
    venue: string
    date: string
    series: string
    tossInfo?: string
    result?: string
}

export function MatchHeader({
    matchTitle,
    series,
    venue,
    date,
    tossInfo,
    result
}: MatchHeaderProps) {
    return (
        <Card className="border border-border/50 shadow-sm bg-card">
            <CardContent className="p-6">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-foreground">{matchTitle}</h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">Venue:</span>
                            <span>{venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">Series:</span>
                            <span>{series}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">Date & Time:</span>
                            <span>{date}</span>
                        </div>
                        {tossInfo && (
                            <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">Toss:</span> {tossInfo}
                            </p>
                        )}
                    </div>

                    {result && (
                        <p className="font-semibold text-primary">
                            {result}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
